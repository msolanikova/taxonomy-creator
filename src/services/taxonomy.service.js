function addNodeToTaxonomy(taxonomy, node, allTypes) {
    let path = _createNodePath(node, allTypes);
    let taxoMap = _createMapFromTaxonomy(taxonomy);
    if(!_pathExists(path, taxoMap)) {
        const pathParts = path.split("/");
        for(let i = 0; i < allTypes.length; i++) {
            const partialPath = pathParts.slice(0, i+3).join("/");
            if(!_pathExists(partialPath, taxoMap)) {
                const newNode = {
                    path: partialPath,
                    type: allTypes[i],
                    name: node[allTypes[i]],
                    children: [],
                }
                _createPath(newNode, partialPath, taxoMap);
                taxoMap = _createMapFromTaxonomy(taxoMap["/root"]);
            }
        }
    }
    return taxonomy;
}

function getAllPaths(nodes, pathList = []) {
    for(let node of nodes) {
        pathList.push(node.path);
        pathList = getAllPaths(node.children, pathList);
    }

    return pathList;
}

function getTypesFromTaxonomy(taxonomyNodes, types = []) {
    for(let node of taxonomyNodes) {
        if(!types.includes(node.type)) {
            types.push(node.type);
        }
        types = getTypesFromTaxonomy(node.children, types);
    }
    return types;
}

function getValuesByTypeFromTaxonomy(taxonomyNodes, valuesByType = {}) {
    for(let node of taxonomyNodes) {
        if(!valuesByType[node.type]) {
            valuesByType[node.type] = [];
        }
        valuesByType[node.type].push(node.name);

        valuesByType = getValuesByTypeFromTaxonomy(node.children, valuesByType);
    }

    return valuesByType;
}

function _createNodePath(node, types) {
    let path = "/root";
    for(let type of types){
        if(node[type]) {
            path += `/${node[type]}`
        }
    }
    return path;
}

function _pathExists(path, taxonomyMap) {
    return taxonomyMap[path];
}

function _findParentNode(path, taxonomyMap) {
    const pathParts = path.split("/");
    const parentPath = pathParts.slice(0, pathParts.length - 1).join("/");
    return _findNode(parentPath, taxonomyMap);
}

function _findNode(path, taxonomyMap) {
    return taxonomyMap[path];
}

function _createMapFromTaxonomy(taxonomy, taxoMap = {}) {
    taxoMap[taxonomy.path] = taxonomy;

    for(let child of taxonomy.children) {
        _createMapFromTaxonomy(child, taxoMap);
    }

    return taxoMap;
}

function _createPath(node, path, taxonomyMap) {
    const parentNode = _findParentNode(path, taxonomyMap);
    parentNode.children.push(node);
}

module.exports = {
    addNodeToTaxonomy: addNodeToTaxonomy,
    getAllPaths: getAllPaths,
    getTypesFromTaxonomy: getTypesFromTaxonomy,
    getValuesByTypeFromTaxonomy: getValuesByTypeFromTaxonomy
}
