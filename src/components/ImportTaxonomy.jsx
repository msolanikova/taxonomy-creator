import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import taxonomyService from "../services/taxonomy.service";
import {connect} from "react-redux";

const ImportTaxonomy = ({dispatch}) => {

    const setTypes = (newTypes) => {
        dispatch({
            type: "CHANGE_TYPES", data: {
                types: [...newTypes]
            }
        });
    }

    const setValuesByType = (newValuesByType) => {
        dispatch({
            type: "CHANGE_TYPE_VALUES", data: {
                valuesByType: {...newValuesByType}
            }
        });
    }

    const setTaxonomy = (taxonomy) => {
        const newTaxonomy = JSON.parse(JSON.stringify(taxonomy));
        dispatch({
            type: "CHANGE_TAXONOMY", data: {
                taxonomy: newTaxonomy
            }
        });
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
                    Upload
                </Button>
            </label>

        </div>
    );
};

export default connect((state, props) => {
    return {}
})(ImportTaxonomy);
