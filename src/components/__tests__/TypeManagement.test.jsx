/**
 * @jest-environment jsdom
 */

import TypeManagement from "../TypeManagement";
import {fireEvent, render, screen} from "@testing-library/react";
import React from 'react';

describe('TypeManagement component', () => {
    it("should list all types provided in properties correctly", () => {
        const testProps = {
            types: ["type1", "type2", "type3"],
            addType: jest.fn()
        }

        const view = render(<TypeManagement {...testProps} />);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(3);
        expect(view).toMatchSnapshot();
    });

    it("should list no types if none is provided in properties", () => {
        const testProps = {
            types: [],
            addType: jest.fn()
        }

        const view = render(<TypeManagement {...testProps} />);

        const listItems = screen.queryAllByRole("listitem");
        expect(listItems).toHaveLength(0);
        expect(view).toMatchSnapshot();
    });

    it("should add new type on hitting 'Add Type' button", async () => {
        const addTypeMock = jest.fn();
        const testProps = {
            types: ["type2", "type3"],
            addType: addTypeMock
        }

        render(<TypeManagement {...testProps} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: 'type1' } })
        fireEvent.click(screen.getByRole("button"));

        expect(addTypeMock).toHaveBeenCalledTimes(1);
    });
});
