/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen, within} from "@testing-library/react";
import CreateTaxonomyNode from "../CreateTaxonomyNode";
import React from 'react';

describe("CreateTaxonomyNode component", () => {
    it("should render selects for each type correctly", () => {
        const testProps = {
            valuesByType: {"type1": [{name: "value1"}, {name:"value2"}], "type2": [{name: "value3"}]},
            addNodeToTaxonomy: jest.fn()
        }

        const view = render(<CreateTaxonomyNode {...testProps} />);

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
        const testProps = {
            valuesByType: {},
            addNodeToTaxonomy: jest.fn()
        }

        const view = render(<CreateTaxonomyNode {...testProps} />);

        expect(screen.queryAllByRole("combobox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(1);
        expect(view).toMatchSnapshot();
    });

    it("should add new node to taxonomy on hitting 'Create Taxonomy Node' button", async () => {
        const addNodeToTaxonomyMock = jest.fn();
        const testProps = {
            valuesByType: {"type1": [{name: "value1"}, {name:"value2"}], "type2": [{name: "value3"}]},
            addNodeToTaxonomy: addNodeToTaxonomyMock
        }

        render(<CreateTaxonomyNode {...testProps} />);
        fireEvent.change(screen.queryAllByRole("combobox")[0], { target: { value: "value2" } })
        fireEvent.change(screen.queryAllByRole("combobox")[1], { target: { value: "value3" } })
        fireEvent.click(screen.getByRole("button"));

        expect(addNodeToTaxonomyMock).toHaveBeenCalledTimes(1);
        expect(addNodeToTaxonomyMock.mock.calls[0][0]).toEqual({"type1": "value2", "type2": "value3"});
    });
});
