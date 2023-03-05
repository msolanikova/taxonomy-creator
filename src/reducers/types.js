import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const typesReducer = createSlice({
    name: "types",
    initialState,
    reducers: {
        addType: (state, action) => {
            state.push(action.payload);
        },
        setTypes: (state, action) => {
            return action.payload;
        }
    }
});

export const {addType, setTypes} = typesReducer.actions;

export default typesReducer.reducer;
