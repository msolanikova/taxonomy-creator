import './App.css';

import AddTypeValue from "./components/AddTypeValue";
import CreateTaxonomyNode from "./components/CreateTaxonomyNode";
import DisplayTaxonomy from "./components/DisplayTaxonomy";
import ImportTaxonomy from "./components/ImportTaxonomy";
import React from 'react';
import TypeManagement from "./components/TypeManagement";

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

