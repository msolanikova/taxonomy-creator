import {createSlice} from "@reduxjs/toolkit";
import taxonomyService from "../services/taxonomy.service";

const initialState = {
    type: "root",
    path: "/root",
    name: "Root",
    children: []
};

export const taxonomyReducer = createSlice({
    name: "taxonomy",
    initialState,
    reducers: {
        addNodeToTaxonomy: (state , action) => {
            return taxonomyService.addNodeToTaxonomy(state, action.payload.node, action.payload.types);
        },
        setTaxonomy: (state, action) => {
            return action.payload;
        },
    }
});

export const {addNodeToTaxonomy, setTaxonomy} = taxonomyReducer.actions;

export default taxonomyReducer.reducer;
