import React, {useState} from 'react';
import {List, ListItem, ListItemText, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addType as addTypeToState} from "../reducers/types";

export default function TypeManagement() {
    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [newType, setNewType] = useState("");

    const addType = (newType) => {
        dispatch(addTypeToState(newType));
    }

    const addNewType = () => {
        addType(newType);
        setNewType("");
    }

    const handleClick = () => {
        addNewType();
    }

    const handleTextInput = (event) => {
        setNewType(event.target.value);
    }
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            addNewType();
        }
    }

    return (
        <div>
            <TextField variant="outlined" label="Type" id="type" value={newType} onChange={handleTextInput} onKeyDown={handleEnter}/>
            <Button variant="contained" onClick={handleClick}>Add type</Button>
            <h2>Types</h2>
            <List dense={true}>
                {types.map((type, index) => (
                    <ListItem key={`listItem-${type}`}>
                        <ListItemText key={`listItemText-${type}`} primary={`${index + 1}. ${type}`}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
