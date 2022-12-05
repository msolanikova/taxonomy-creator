import './App.css';
import TypeManagement from "./components/TypeManagement";
import {useEffect, useState} from "react";
import AddTypeValue from "./components/AddTypeValue";
import CreateTaxonomyNode from "./components/CreateTaxonomyNode";
import taxonomyService from "./services/taxonomy.service";
import DisplayTaxonomy from "./components/DisplayTaxonomy";
import ImportTaxonomy from "./components/ImportTaxonomy";
import React from 'react';

function App() {
    const [types, setTypes] = useState([]);
    const [valuesByType, setValuesByType] = useState({});
    const [taxonomy, setTaxonomy] = useState({type: "root", path: "/root", name: "Root", children: []});

    const addType = (newType) => {
        setTypes([...types, newType]);
    }

    const addTypeValue = (value, type) => {
        const valuesByTypeCopy = {...valuesByType};
        if(!valuesByTypeCopy[type]) {
            valuesByTypeCopy[type] = [];
        }
        valuesByTypeCopy[type].push(value);
        setValuesByType(valuesByTypeCopy);
    }

    const addNodeToTaxonomy = (node) => {
        const taxoCopy = taxonomyService.addNodeToTaxonomy(node, taxonomy, types);
        setTaxonomy(taxoCopy);
    }

    useEffect(() => {
        console.log(taxonomy);
    }, [taxonomy])

    const actions = {
        setTypes,
        setValuesByType,
        setTaxonomy
    }

    return (
        <>
            <div className="App">
                <h1>Taxonomy Creator</h1>
                <ImportTaxonomy actions={actions} />
                <hr/>
                <TypeManagement types={types} addType={addType} />
                <hr />
                <AddTypeValue types={types} addTypeValue={addTypeValue} />
                <hr />
                <CreateTaxonomyNode valuesByType={valuesByType} addNodeToTaxonomy={addNodeToTaxonomy} />
                <hr />
                <DisplayTaxonomy taxonomy={taxonomy} />
            </div>
        </>
    );
}

export default App;
