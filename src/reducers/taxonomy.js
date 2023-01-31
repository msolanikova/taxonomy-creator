const defaultState = {
    type: "root",
    path: "/root",
    name: "Root",
    children: []
};

export default function taxonomyReducer(state = defaultState, action) {
    if(action.type === "CHANGE_TAXONOMY") {
        const newState = {
            ...state,
            ...action.data.taxonomy,
        }
        return newState;
    }

    return state;
}
