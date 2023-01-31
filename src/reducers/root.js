import {combineReducers} from "redux";
import taxonomyReducer from "./taxonomy";
import valuesByTypeReducer from "./valuesByType";
import typesReducer from "./types";

const appReducer = combineReducers({
    types: typesReducer,
    valuesByType: valuesByTypeReducer,
    taxonomy: taxonomyReducer,
});

export default appReducer;
