import {configureStore} from "@reduxjs/toolkit";
import {typesReducer} from "../../reducers/types";
import {valuesByTypeReducer} from "../../reducers/valuesByType";
import {taxonomyReducer} from "../../reducers/taxonomy";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import React from "react";

const setupStore = preloadedState => {
    return configureStore({
        reducer:  {
            types: typesReducer.reducer,
            valuesByType: valuesByTypeReducer.reducer,
            taxonomy: taxonomyReducer.reducer,
        },
        preloadedState
    })
}

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
