/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen, within} from "@testing-library/react";
import CreateTaxonomyNode from "../CreateTaxonomyNode";
import React from 'react';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import taxonomyServiceMock from "../../services/taxonomy.service";

const mockStore = configureMockStore();
taxonomyServiceMock.addNodeToTaxonomy = jest.fn();

describe("CreateTaxonomyNode component", () => {
    it("should render selects for each type correctly", () => {
        const state = {
            types: ["type1", "type2"],
            valuesByType: {"type1": ["value1","value2"], "type2": ["value3"]},
            taxonomy: {type: "root", path: "/root", name: "Root", children: []}
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><CreateTaxonomyNode/></Provider>);

        const allSelects = screen.getAllByRole("combobox");
        expect(allSelects).toHaveLength(2);
        const type1Select = allSelects[0];
        const type2Select = allSelects[1];
        expect(screen.getAllByRole("button")).toHaveLength(1);

        const type1Options = within(type1Select).getAllByRole('option');
        const type2Options = within(type2Select).getAllByRole('option');
        expect(type1Options).toHaveLength(3);
        expect(type2Options).toHaveLength(2);
        expect(view).toMatchSnapshot();
    });

    it("should render no selects if there is no type provided", () => {
        const state = {
            types: [],
            valuesByType: {},
            taxonomy: {type: "root", path: "/root", name: "Root", children: []}
        }

        const store = mockStore(state);
        const view = render(<Provider store={store}><CreateTaxonomyNode/></Provider>);

        expect(screen.queryAllByRole("combobox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(1);
        expect(view).toMatchSnapshot();
    });

    it("should add new node to taxonomy on hitting 'Create Taxonomy Node' button", async () => {
        const state = {
            types: ["type1", "type2"],
            valuesByType: {"type1": ["value1","value2"], "type2": ["value3"]},
            taxonomy: {type: "root", path: "/root", name: "Root", children: []}
        }

        const store = mockStore(state);
        render(<Provider store={store}><CreateTaxonomyNode/></Provider>);

        fireEvent.change(screen.queryAllByRole("combobox")[0], { target: { value: "value2" } })
        fireEvent.change(screen.queryAllByRole("combobox")[1], { target: { value: "value3" } })
        fireEvent.click(screen.getByRole("button"));

        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBeDefined();
        expect(store.getActions()[0].type).toBe("CHANGE_TAXONOMY");
        expect(taxonomyServiceMock.addNodeToTaxonomy).toHaveBeenCalledTimes(1);
        expect(taxonomyServiceMock.addNodeToTaxonomy.mock.calls[0][0]).toEqual({"type1": "value2", "type2": "value3"});
    });
});
