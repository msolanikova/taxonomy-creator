import React, {useState} from 'react';
import {List, ListItem, ListItemText, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {connect} from "react-redux";

const TypeManagement = ({types, dispatch}) => {
    const [newType, setNewType] = useState("");

    const addType = (newType) => {
        dispatch({
            type: "CHANGE_TYPES", data: {
                types: [...types, newType]
            }
        });
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

// export default TypeManagement;
export default connect((state, props) => {
    return {
        types: state.types.types,
    }
})(TypeManagement);
