import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

function AddTaxonomyNode({types, addNode}) {
    const [newNodes, setNewNodes] = useState({});

    const changeNewNodes = (type, value) => {
        const newNodesCopy = {...newNodes};
        newNodesCopy[type] = value;
        setNewNodes(newNodesCopy);
    }

    const handleClick = (type) => {
        addNode({name: newNodes[type]}, type);
        changeNewNodes(type, "");
    }

    const handleTextInput = (type, value) => {
        changeNewNodes(type, value);
    }

    const handleEnter = (event, type) => {
        if (event.key === 'Enter') {
            handleClick(type);
        }
    }

    useEffect(() => {
        const initialState = types.reduce((acc, curr) => {
            acc[curr] = "";
            return acc;
        }, {});
        setNewNodes(initialState);
    }, [types]);

    return (
        <div>
            <h2>Add node</h2>
            {types.map(type => (
                <div key={`addNode-${type}`}>
                    <TextField
                        variant="outlined"
                        label={type}
                        key={`text-${type}`}
                        value={newNodes[type] ?? ""}
                        onChange={(ev) => handleTextInput(type, ev.target.value)}
                        onKeyDown={(ev) => handleEnter(ev, type)} />
                    <Button
                        variant="contained"
                        key={`button-${type}`}
                        onClick={() => handleClick(type)}>Add node</Button>
                </div>
            ))}
        </div>
    );
}

export default AddTaxonomyNode;
