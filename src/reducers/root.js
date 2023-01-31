import {combineReducers} from "redux";
import taxonomyReducer from "./taxonomy";
import valuesByTypeReducer from "./valuesByType";
import typesReducer from "./types";
import fakeApiReducer from "./fakeApi";

const appReducer = combineReducers({
    types: typesReducer,
    valuesByType: valuesByTypeReducer,
    taxonomy: taxonomyReducer,
    fakeData: fakeApiReducer
});

export default appReducer;
