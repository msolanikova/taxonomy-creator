import './App.css';
import TypeManagement from "./components/TypeManagement";
import {useEffect, useState} from "react";
import AddTypeValue from "./components/AddTypeValue";
import CreateTaxonomyNode from "./components/CreateTaxonomyNode";
import taxonomyService from "./services/taxonomy.service";
import DisplayTaxonomy from "./components/DisplayTaxonomy";
import ImportTaxonomy from "./components/ImportTaxonomy";
import React from 'react';
import {connect} from "react-redux";

function App() {
    return (
        <>
            <div className="App">
                <h1>Taxonomy Creator</h1>
                <ImportTaxonomy />
                <hr/>
                <TypeManagement />
                <hr />
                <AddTypeValue />
                <hr />
                <CreateTaxonomyNode />
                <hr />
                <DisplayTaxonomy />
            </div>
        </>
    );
}

export default App;

