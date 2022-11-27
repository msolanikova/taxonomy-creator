/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen} from "@testing-library/react";
import AddTypeValue from "../AddTypeValue";
import React from 'react';

describe("AddTypeValue component", () => {
    it("should render textbox for each type correctly", () => {
        const testProps = {
            types: ["type1", "type2", "type3"],
            addTypeValue: jest.fn()
        }

        const view = render(<AddTypeValue {...testProps} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(3);
        expect(screen.getAllByRole("button")).toHaveLength(3);
        expect(view).toMatchSnapshot();
    });

    it("should render no textbox if there is no type provided", () => {
        const testProps = {
            types: [],
            addTypeValue: jest.fn()
        }

        const view = render(<AddTypeValue {...testProps} />);

        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
        expect(screen.queryAllByRole("button")).toHaveLength(0);
        expect(view).toMatchSnapshot();
    });

    it("should add new type value on hitting 'Add Type' button", async () => {
        const addTypeValueMock = jest.fn();
        const testProps = {
            types: ["type1", "type2", "type3"],
            addTypeValue: addTypeValueMock
        }

        render(<AddTypeValue {...testProps} />);
        fireEvent.change(screen.queryAllByRole("textbox")[1], { target: { value: 'typevalue2' } })
        fireEvent.click(screen.queryAllByRole("button")[1]);

        expect(addTypeValueMock).toHaveBeenCalledTimes(1);
        expect(addTypeValueMock.mock.calls[0][0]).toEqual({name: "typevalue2", type: "type2"});
        expect(addTypeValueMock.mock.calls[0][1]).toBe("type2");
    });
});
