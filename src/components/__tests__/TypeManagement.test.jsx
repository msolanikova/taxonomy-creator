/**
 * @jest-environment jsdom
 */

import TypeManagement from "../TypeManagement";
import {fireEvent, render, screen} from "@testing-library/react";
import React from 'react';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import CreateTaxonomyNode from "../CreateTaxonomyNode";

const mockStore = configureMockStore();

describe('TypeManagement component', () => {
    it("should list all types provided in properties correctly", () => {
        const state = {
            types: ["type1", "type2", "type3"],
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><TypeManagement/></Provider>);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(3);
        expect(view).toMatchSnapshot();
    });

    it("should list no types if none is provided in properties", () => {
        const state = {
            types: [],
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><TypeManagement/></Provider>);

        const listItems = screen.queryAllByRole("listitem");
        expect(listItems).toHaveLength(0);
        expect(view).toMatchSnapshot();
    });

    it("should add new type on hitting 'Add Type' button", async () => {
        const state = {
            types: ["type2", "type3"],
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><TypeManagement/></Provider>);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: 'type1' } })
        fireEvent.click(screen.getByRole("button"));

        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBeDefined();
        expect(store.getActions()[0].type).toBe("CHANGE_TYPES");
        expect(store.getActions()[0].data).toBeDefined();
        expect(store.getActions()[0].data).toEqual({
            types: ["type2", "type3", "type1"]
        });
    });
});
