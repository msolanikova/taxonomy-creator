import {configureStore} from "@reduxjs/toolkit";
import {typesReducer} from "../reducers/types";
import {valuesByTypeReducer} from "../reducers/valuesByType";
import {taxonomyReducer} from "../reducers/taxonomy";
import {createLogger} from "redux-logger";

const logger = createLogger({
    collapsed: true
});

const store = configureStore({
    reducer: {
        types: typesReducer.reducer,
        valuesByType: valuesByTypeReducer.reducer,
        taxonomy: taxonomyReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
