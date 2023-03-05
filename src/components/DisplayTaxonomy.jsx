import React, {useEffect, useState} from 'react';
import {TreeItem, TreeView} from "@mui/lab";
import {ChevronRight, ExpandMore} from "@mui/icons-material";
import taxonomyService from "../services/taxonomy.service";
import {useSelector} from "react-redux";

export default function DisplayTaxonomy() {
    const taxonomy = useSelector((state) => state.taxonomy);
    const [expanded, setExpanded] = useState([]);

    const renderTaxonomy = (tax) => {
        return (
            <TreeItem nodeId={tax.path} label={tax.name}>
                {renderTaxonomyChildren(tax.children)}
            </TreeItem>
        );
    }

    const renderTaxonomyChildren = (nodes) => {
        const children = nodes.map((child) => (
            <TreeItem key={child.path} nodeId={child.path} label={child.name}>
                { child.children.length > 0 ? renderTaxonomyChildren(child.children) : ""}
            </TreeItem>
        ));

        return children;
    }

    useEffect(() => {
        const paths = taxonomyService.getAllPaths([taxonomy]);
        setExpanded(paths);
    }, [taxonomy]);

    const handleToggle = (event, paths) => {
        setExpanded(paths);
    };

    return (
        <div>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ChevronRight/>}
                expanded={expanded}
                onNodeToggle={handleToggle}
                sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}
            >
                {renderTaxonomy(taxonomy)}
            </TreeView>
            <pre>{JSON.stringify(taxonomy, null, 2)}</pre>
            {/*<pre>{JSON.stringify(fakeData, null, 2)}</pre>*/}
        </div>
    );
};
