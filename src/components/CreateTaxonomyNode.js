import React, {useEffect, useState} from 'react';
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";

const CreateTaxonomyNode = ({nodesByType, addNodeToTaxonomy}) => {
    const [taxoNode, setTaxoNode] = useState({});

    useEffect(() => {
    }, [nodesByType]);

    const renderItems = (nodes) => {
        const items = nodes.map(node => (
            <MenuItem key={node.name} value={node.name}>{node.name}</MenuItem>
        ));
        return items;
    }

    const handleSelect = (type, value) => {
        const taxoNodeCopy = {...taxoNode};
        taxoNodeCopy[type] = value;
        setTaxoNode(taxoNodeCopy);
    }

    const renderSelectsForTypes = (nodesByType) => {
        return Object.keys(nodesByType).map(type => {
            const nodes = nodesByType[type];
            const items = renderItems(nodes);
            return (
                <div key={type}>
                    <InputLabel id="demo-simple-select-label">{type}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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
            {renderSelectsForTypes(nodesByType)}
            <Button variant="contained" disabled={Object.keys(taxoNode).length === 0} onClick={addTaxoNode}>Add Taxonomy Node</Button>
        </div>
    );
};

export default CreateTaxonomyNode;
