const defaultState = {};

export default function fakeApiReducer(state = defaultState, action) {
    if(action.type === "FAKE_API_SUCCESSFUL") {
        const newState = {
            ...state,
            ...action.data,
        }
        return newState;
    }

    if(action.type === "FAKE_API_FAILED") {
        const newState = {
            ...state,
            ...action.data,
        }
        return newState;
    }

    return state;
}
