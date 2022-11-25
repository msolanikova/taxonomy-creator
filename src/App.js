import './App.css';
import TypeManagement from "./TypeManagement";
import {useEffect, useState} from "react";
import AddTaxonomyNode from "./components/AddTaxonomyNode";
import CreateTaxonomyNode from "./components/CreateTaxonomyNode";
import taxonomyService from "./services/taxonomy.service";
import DisplayTaxonomy from "./components/DisplayTaxonomy";
import ImportTaxonomy from "./components/ImportTaxonomy";

function App() {
    const [types, setTypes] = useState([]);
    const [nodesByType, setNodesByType] = useState({});
    const [taxonomy, setTaxonomy] = useState({type: "root", path: "/root", name: "Root", children: []});

    const addType = (newType) => {
        setTypes([...types, newType]);
    }

    const addNode = (node, type) => {
        const nodesByTypeCopy = {...nodesByType};
        if(!nodesByTypeCopy[type]) {
            nodesByTypeCopy[type] = [];
        }
        nodesByTypeCopy[type].push(node);
        setNodesByType(nodesByTypeCopy);
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
        setNodesByType,
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
                <AddTaxonomyNode types={types} addNode={addNode} />
                <hr />
                <CreateTaxonomyNode nodesByType={nodesByType} addNodeToTaxonomy={addNodeToTaxonomy} />
                <hr />
                <DisplayTaxonomy taxonomy={taxonomy} />
            </div>
        </>
    );
}

export default App;
