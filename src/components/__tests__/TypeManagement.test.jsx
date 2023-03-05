/**
 * @jest-environment jsdom
 */

import TypeManagement from "../TypeManagement";
import {fireEvent, screen} from "@testing-library/react";
import React from 'react';
import {renderWithProviders} from "./test-utils";

describe('TypeManagement component', () => {
    it("should list all types provided in properties correctly", () => {
        const {container} = renderWithProviders(<TypeManagement/>, {
            preloadedState: {
                types: ["type1", "type2", "type3"]
            }
        });

        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(3);
        expect(container).toMatchSnapshot();
    });

    it("should list no types if none is provided in properties", () => {
        const {container} = renderWithProviders(<TypeManagement/>, {
            preloadedState: {
                types: []
            }
        });

        const listItems = screen.queryAllByRole("listitem");
        expect(listItems).toHaveLength(0);
        expect(container).toMatchSnapshot();
    });

    it("should add new type on hitting 'Add Type' button", async () => {
        const {store} = renderWithProviders(<TypeManagement/>, {
            preloadedState: {
                types: ["type2", "type3"]
            }
        });

        fireEvent.change(screen.getByRole("textbox"), { target: { value: 'type1' } })
        fireEvent.click(screen.getByRole("button"));

        const state = store.getState();
        expect(state.types).toHaveLength(3);
        expect(state.types).toEqual(["type2", "type3", "type1"]);
    });
});
