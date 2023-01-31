const defaultState = {
    types: []
};

export default function typesReducer(state = defaultState, action) {
    if(action.type === "CHANGE_TYPES") {
        const newState = {
            ...state,
            types: action.data.types,
        }
        return newState;
    }

    return state;
}
