import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appReducer from "../reducers/root";
import {createLogger} from "redux-logger";

const logger = createLogger({
    collapsed: true
});

const store = createStore(appReducer, applyMiddleware(thunk, logger));

export default store;
