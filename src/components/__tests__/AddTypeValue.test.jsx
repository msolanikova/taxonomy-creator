/**
 * @jest-environment jsdom
 */

import {fireEvent, screen} from "@testing-library/react";
import AddTypeValue from "../AddTypeValue";
import React from 'react';
import {renderWithProviders} from "./test-utils";

describe("AddTypeValue component", () => {
    it("should render textbox for each type correctly", () => {
        const {container} = renderWithProviders(<AddTypeValue/>, {
            preloadedState: {
                types: ["type1", "type2", "type3"],
                valuesByType: {}
            }
        });

        expect(screen.getAllByRole("textbox")).toHaveLength(3);
        expect(screen.getAllByRole("button")).toHaveLength(3);
        expect(container).toMatchSnapshot();
    });

    it("should render no textbox if there is no type provided", () => {
        const {container} = renderWithProviders(<AddTypeValue/>, {
            preloadedState: {
                types: [],
                valuesByType: {}
            }
        });

        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(0);
        expect(container).toMatchSnapshot();
    });

    it("should dispatch CHANGE_TYPE_VALUES on hitting 'Add Type' button", async () => {
        const {store} = renderWithProviders(<AddTypeValue/>, {
            preloadedState: {
                types: ["type1", "type2", "type3"],
                valuesByType: {}
            }
        });

        fireEvent.change(screen.queryAllByRole("textbox")[1], {target: {value: 'typevalue2'}})
        fireEvent.click(screen.queryAllByRole("button")[1]);

        const state = store.getState();
        expect(Object.keys(state.valuesByType)).toHaveLength(1);
        expect(state.valuesByType).toHaveProperty("type2");
        expect(state.valuesByType["type2"]).toEqual(["typevalue2"]);

    });
});
