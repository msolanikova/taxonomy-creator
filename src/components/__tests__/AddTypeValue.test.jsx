/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen} from "@testing-library/react";
import AddTypeValue from "../AddTypeValue";
import React from 'react';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe("AddTypeValue component", () => {
    it("should render textbox for each type correctly", () => {
        const state = {
            types: {types: ["type1", "type2", "type3"]},
            valuesByType: {}
        }
        const store = mockStore(state);
        const view = render(<Provider store={store}><AddTypeValue/></Provider>);

        expect(screen.getAllByRole("textbox")).toHaveLength(3);
        expect(screen.getAllByRole("button")).toHaveLength(3);
        expect(view).toMatchSnapshot();
    });

    it("should render no textbox if there is no type provided", () => {
        const state = {
            types: {types: []},
            valuesByType: {}
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><AddTypeValue/></Provider>);

        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(0);
        expect(view).toMatchSnapshot();
    });

    it("should dispatch CHANGE_TYPE_VALUES on hitting 'Add Type' button", async () => {
        const state = {
            types: {types: ["type1", "type2", "type3"]},
            valuesByType: {}
        }

        const store = mockStore(state);
        render(<Provider store={store}><AddTypeValue/></Provider>);

        fireEvent.change(screen.queryAllByRole("textbox")[1], {target: {value: 'typevalue2'}})
        fireEvent.click(screen.queryAllByRole("button")[1]);

        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBeDefined();
        expect(store.getActions()[0].type).toEqual("CHANGE_TYPE_VALUES");
        expect(store.getActions()[0].data).toBeDefined();
        expect(store.getActions()[0].data).toEqual({
            valuesByType: {
                "type2": ["typevalue2"]
            }
        });
    });
});
