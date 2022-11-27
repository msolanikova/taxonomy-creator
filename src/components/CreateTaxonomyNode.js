import React, {useState} from 'react';
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";

const CreateTaxonomyNode = ({valuesByType, addNodeToTaxonomy}) => {
    const [taxoNode, setTaxoNode] = useState({});

    const renderItemsForType = (nodes, type) => {
        const nodesCopy = [{name: ""}, ...nodes];
        const items = nodesCopy.map(node => (
            // <MenuItem key={node.name} value={node.name}>{node.name}</MenuItem>
            <option key={node.name ? node.name : `${type}-null`} value={node.name}>{node.name}</option>
        ));
        return items;
    }

    const handleSelect = (type, value) => {
        const taxoNodeCopy = {...taxoNode};
        if(value === "") {
            delete taxoNodeCopy[type];
        } else {
            taxoNodeCopy[type] = value;
        }
        setTaxoNode(taxoNodeCopy);
    }

    const renderSelectsForTypes = (valuesByType) => {
        return Object.keys(valuesByType).map(type => {
            const nodes = valuesByType[type];
            const items = renderItemsForType(nodes, type);
            return (
                <div key={type}>
                    <InputLabel id="demo-simple-select-label">{type}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id={type}
                        native={true}
                        value={taxoNode[type] ?? ""}
                        label={type}
                        onChange={(ev) => handleSelect(type, ev.target.value)}
                    >
                        {items}
                    </Select>
                </div>
            );
        });
    }

    const addTaxoNode = () => {
        addNodeToTaxonomy(taxoNode);
        setTaxoNode({})
    }

    return (
        <div>
            <h2>Create Taxonomy Node</h2>
            {renderSelectsForTypes(valuesByType)}
            <Button variant="contained" disabled={Object.keys(taxoNode).length === 0} onClick={addTaxoNode}>Add Taxonomy Node</Button>
        </div>
    );
};

export default CreateTaxonomyNode;
