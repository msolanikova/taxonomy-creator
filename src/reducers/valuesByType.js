import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

export const valuesByTypeReducer = createSlice({
    name: "valuesByType",
    initialState,
    reducers: {
        addValueToType: (state, action) => {
            if (!state[action.payload.type]) {
                state[action.payload.type] = [];
            }
            state[action.payload.type].push(action.payload.value);
        },
        setValuesByType: (state, action) => {
            return action.payload;
        }
    }
});

export const {addValueToType, setValuesByType} = valuesByTypeReducer.actions;

export default valuesByTypeReducer.reducer;
