/**
 * @jest-environment jsdom
 */

import {fireEvent, screen, within} from "@testing-library/react";
import CreateTaxonomyNode from "../CreateTaxonomyNode";
import React from 'react';
import taxonomyServiceMock from "../../services/taxonomy.service";
import {renderWithProviders} from "./test-utils";

taxonomyServiceMock.addNodeToTaxonomy = jest.fn();

describe("CreateTaxonomyNode component", () => {
    it("should render selects for each type correctly", () => {
        const {container} = renderWithProviders(<CreateTaxonomyNode/>, {
            preloadedState: {
                types: ["type1", "type2"],
                valuesByType: {"type1": ["value1", "value2"], "type2": ["value3"]},
                taxonomy: {type: "root", path: "/root", name: "Root", children: []}
            }
        });

        const allSelects = screen.getAllByRole("combobox");
        expect(allSelects).toHaveLength(2);
        const type1Select = allSelects[0];
        const type2Select = allSelects[1];
        expect(screen.getAllByRole("button")).toHaveLength(1);

        const type1Options = within(type1Select).getAllByRole('option');
        const type2Options = within(type2Select).getAllByRole('option');
        expect(type1Options).toHaveLength(3);
        expect(type2Options).toHaveLength(2);
        expect(container).toMatchSnapshot();
    });

    it("should render no selects if there is no type provided", () => {
        const {container} = renderWithProviders(<CreateTaxonomyNode/>, {
            preloadedState: {
                types: [],
                valuesByType: {},
                taxonomy: {type: "root", path: "/root", name: "Root", children: []}
            }
        });

        expect(screen.queryAllByRole("combobox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(1);
        expect(container).toMatchSnapshot();
    });

    it("should add new node to taxonomy on hitting 'Create Taxonomy Node' button", async () => {
        renderWithProviders(<CreateTaxonomyNode/>, {
            preloadedState: {
                types: ["type1", "type2"],
                valuesByType: {"type1": ["value1", "value2"], "type2": ["value3"]},
                taxonomy: {type: "root", path: "/root", name: "Root", children: []}
            }
        });

        fireEvent.change(screen.queryAllByRole("combobox")[0], {target: {value: "value2"}})
        fireEvent.change(screen.queryAllByRole("combobox")[1], {target: {value: "value3"}})
        fireEvent.click(screen.getByRole("button"));

        expect(taxonomyServiceMock.addNodeToTaxonomy).toHaveBeenCalledTimes(1);
        expect(taxonomyServiceMock.addNodeToTaxonomy.mock.calls[0][1]).toEqual({"type1": "value2", "type2": "value3"});
        expect(taxonomyServiceMock.addNodeToTaxonomy.mock.calls[0][2]).toEqual(["type1", "type2"]);
    });
});
