import React, {useEffect, useState} from 'react';
import {TreeItem, TreeView} from "@mui/lab";
import {ChevronRight, ExpandMore} from "@mui/icons-material";
import taxonomyService from "../services/taxonomy.service";
import {connect} from "react-redux";

const DisplayTaxonomy = ({taxonomy}) => {
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
        console.log(taxonomy);
    }, [taxonomy]);

    return (
        <div>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ChevronRight/>}
                expanded={expanded}
                sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}
            >
                {renderTaxonomy(taxonomy)}
            </TreeView>
            <pre>{JSON.stringify(taxonomy, null, 2)}</pre>
        </div>
    );
};

// export default DisplayTaxonomy;
export default connect((state, props) => {
    return {
        taxonomy: state.taxonomy,
    }
})(DisplayTaxonomy);
