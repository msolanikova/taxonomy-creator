import {createStore} from 'redux';

const defaultState = {
    types: [],
    valuesByType: {},
    taxonomy: {type: "root", path: "/root", name: "Root", children: []}
}

function reducer(state = defaultState, action) {
    if(action.type === "CHANGE_TYPES") {
        const newState = {
            ...state,
            types: action.data.types,
        }
        console.log("new state", newState);
        return newState;
    }

    if(action.type === "CHANGE_TYPE_VALUES") {
        const newState = {
            ...state,
            valuesByType: action.data.valuesByType,
        }
        console.log("new state", newState);
        return newState;
    }

    if(action.type === "CHANGE_TAXONOMY") {
        const newState = {
            ...state,
            taxonomy: action.data.taxonomy,
        }
        console.log("new state", newState);
        return newState;
    }

    return state;
}

const store = createStore(reducer);

export default store;
