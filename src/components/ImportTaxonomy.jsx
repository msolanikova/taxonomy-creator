import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import taxonomyService from "../services/taxonomy.service";

const ImportTaxonomy = ({actions}) => {

    const importTaxonomy = ({target}) => {
        const reader = new FileReader();
        reader.onload = function() {
            const text = reader.result;
            const taxonomy = JSON.parse(text);
            actions.setTaxonomy(taxonomy);
            actions.setTypes(taxonomyService.getTypesFromTaxonomy(taxonomy.children));
            actions.setValuesByType(taxonomyService.getValuesByTypeFromTaxonomy(taxonomy.children));
        };
        reader.readAsText(target.files[0]);
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <input
                accept="application/json"
                style={{ display: 'none' }}
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

export default ImportTaxonomy;
