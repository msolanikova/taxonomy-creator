import taxonomyService from "../taxonomy.service";

describe("taxonomy.service", () => {

    describe("addNodeToTaxonomy", () => {
        it("should add new node and its parents to empty taxonomy", () => {
            const taxonomy = taxonomyService.addNodeToTaxonomy({dc: "kosice", i: "retail", ac: "matrix"}, {
                type: "root",
                path: "/root",
                name: "Root",
                children: []
            }, ["dc", "i", "ac"]);

            expect(taxonomy).toMatchObject({
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        });

        it("should add new leaf node to existing taxonomy", () => {
            const taxonomy = taxonomyService.addNodeToTaxonomy({dc: "kosice", i: "retail", ac: "matrix"}, {
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: []
                            }
                        ]
                    }
                ]
            }, ["dc", "i", "ac"]);

            expect(taxonomy).toMatchObject({
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        });

        it("should add new middle node to existing taxonomy when sibling node doesn't exist exists", () => {
            const taxonomy = taxonomyService.addNodeToTaxonomy({dc: "kosice", i: "retail", ac: "matrix"}, {
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: []
                    }
                ]
            }, ["dc", "i", "ac"]);

            expect(taxonomy).toMatchObject({
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        });

        it("should add new middle node to existing taxonomy when sibling node exists", () => {
            const taxonomy = taxonomyService.addNodeToTaxonomy({dc: "kosice", i: "retail", ac: "matrix"}, {
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/media",
                                name: "media",
                                children: []
                            }
                        ]
                    }
                ]
            }, ["dc", "i", "ac"]);

            expect(taxonomy).toMatchObject({
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/media",
                                name: "media",
                                children: []
                            },
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        });
    });

    describe("getAllPaths", () => {
        it("should return all path of given taxonomy", () => {
            const pathList = taxonomyService.getAllPaths([{
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/media",
                                name: "media",
                                children: []
                            },
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]);
            expect(pathList).toHaveLength(5);
            expect(pathList).toContain("/root")
            expect(pathList).toContain("/root/kosice")
            expect(pathList).toContain("/root/kosice/media")
            expect(pathList).toContain("/root/kosice/retail")
            expect(pathList).toContain("/root/kosice/retail/matrix")
        });
    });

    describe("getTypesFromTaxonomy", () => {
        it("should return all types from taxonomy", () => {
            const taxonomy = {
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/media",
                                name: "media",
                                children: []
                            },
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            const types = taxonomyService.getTypesFromTaxonomy(taxonomy.children);

            expect(types).toHaveLength(3);
            expect(types).toContain("dc");
            expect(types).toContain("i");
            expect(types).toContain("ac");
        })
    })

    describe("getNodesByTypeFromTaxonomy", () => {
        it("should split taxonomy nodes by types", () => {
            const taxonomy = {
                type: "root",
                path: "/root",
                name: "Root",
                children: [
                    {
                        type: "dc",
                        path: "/root/kosice",
                        name: "kosice",
                        children: [
                            {
                                type: "i",
                                path: "/root/kosice/media",
                                name: "media",
                                children: []
                            },
                            {
                                type: "i",
                                path: "/root/kosice/retail",
                                name: "retail",
                                children: [
                                    {
                                        type: "ac",
                                        path: "/root/kosice/retail/matrix",
                                        name: "matrix",
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            const nodesByType = taxonomyService.getNodesByTypeFromTaxonomy(taxonomy.children);
            expect(nodesByType).toHaveProperty("dc");
            expect(nodesByType).toHaveProperty("i");
            expect(nodesByType).toHaveProperty("ac");
            expect(nodesByType["dc"]).toHaveLength(1);
            expect(nodesByType["dc"][0].name).toBe("kosice");
            expect(nodesByType["i"]).toHaveLength(2);
            expect(nodesByType["i"][0].name).toBe("media");
            expect(nodesByType["i"][1].name).toBe("retail");
            expect(nodesByType["ac"]).toHaveLength(1);
            expect(nodesByType["ac"][0].name).toBe("matrix");
        })
    })
});

