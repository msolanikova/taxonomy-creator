import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addValueToType} from "../reducers/valuesByType";

axios.defaults.timeout = 10000;

export default function AddTypeValue() {
    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [newNodes, setNewNodes] = useState({});

   /* const fetchFakeApi = (id) => {
        return async function fetchFakeApiThunk(dispatch, getState) {
            try {
                const response = await axios.get(`http://localhost:8000/fake-api`, {
                    params: {
                        id: id
                    }
                });
                dispatch({
                    type: "FAKE_API_SUCCESSFUL",
                    data: response.data
                });
            } catch(err) {
                dispatch({
                    type: "FAKE_API_FAILED",
                    data: err
                })
            }
        }
    }*/

    const addTypeValue = (value, type) => {
        // dispatch(fetchFakeApi(`${type}-${value}`));
        dispatch(addValueToType({value, type}));
    }

    const changeNewNodes = (type, value) => {
        const newNodesCopy = {...newNodes};
        newNodesCopy[type] = value;
        setNewNodes(newNodesCopy);
    }

    const handleClick = (type) => {
        addTypeValue(newNodes[type], type);
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
            <h2>Add Type Value</h2>
            {types.map(type => (
                <div key={`addNode-${type}`}>
                    <TextField
                        variant="outlined"
                        label={type}
                        key={`text-${type}`}
                        value={newNodes[type] ?? ""}
                        onChange={(ev) => handleTextInput(type, ev.target.value)}
                        onKeyDown={(ev) => handleEnter(ev, type)}/>
                    <Button
                        variant="contained"
                        key={`button-${type}`}
                        onClick={() => handleClick(type)}>Add node</Button>
                </div>
            ))}
        </div>
    );
}
