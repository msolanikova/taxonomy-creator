import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import taxonomyService from "../services/taxonomy.service";
import {useDispatch} from "react-redux";
import {setTypes as setTypesToState} from "../reducers/types";
import {setValuesByType as setValuesByTypeToState} from "../reducers/valuesByType";
import {setTaxonomy as setTaxonomyToState} from "../reducers/taxonomy";

export default function ImportTaxonomy() {
    const dispatch = useDispatch();

    const setTypes = (newTypes) => {
        dispatch(setTypesToState([...newTypes]));
    }

    const setValuesByType = (newValuesByType) => {
        dispatch(setValuesByTypeToState({...newValuesByType}));
    }

    const setTaxonomy = (taxonomy) => {
        const newTaxonomy = JSON.parse(JSON.stringify(taxonomy));
        dispatch(setTaxonomyToState(newTaxonomy));
    }

    const importTaxonomy = ({target}) => {
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            const taxonomy = JSON.parse(text);
            setTaxonomy(taxonomy);
            setTypes(taxonomyService.getTypesFromTaxonomy(taxonomy.children));
            setValuesByType(taxonomyService.getValuesByTypeFromTaxonomy(taxonomy.children));
        };
        reader.readAsText(target.files[0]);
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <input
                accept="application/json"
                style={{display: 'none'}}
                id="raised-button-file"
                onChange={importTaxonomy}
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload NEW NEW NEW
                </Button>
            </label>

        </div>
    );
};
