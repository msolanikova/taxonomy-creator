const defaultState = {};

export default function valuesByTypeReducer(state = defaultState, action) {
    if(action.type === "CHANGE_TYPE_VALUES") {
        const newState = {
            ...state,
            ...action.data.valuesByType,
        }
        return newState;
    }

    return state;
}
