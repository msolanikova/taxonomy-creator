import taxonomyService from "../taxonomy.service";

describe("taxonomy.service", () => {

    describe("addNodeToTaxonomy", () => {
        it("should add new node and its parents to empty taxonomy", () => {
            const taxonomy = taxonomyService.addNodeToTaxonomy({
                type: "root",
                path: "/root",
                name: "Root",
                children: []
            }, {dc: "kosice", i: "retail", ac: "matrix"}, ["dc", "i", "ac"]);

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
            const taxonomy = taxonomyService.addNodeToTaxonomy({
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
            }, {dc: "kosice", i: "retail", ac: "matrix"},["dc", "i", "ac"]);

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
            const taxonomy = taxonomyService.addNodeToTaxonomy({
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
            }, {dc: "kosice", i: "retail", ac: "matrix"}, ["dc", "i", "ac"]);

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
            const taxonomy = taxonomyService.addNodeToTaxonomy({
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
            }, {dc: "kosice", i: "retail", ac: "matrix"}, ["dc", "i", "ac"]);

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

    describe("getValuesByTypeFromTaxonomy", () => {
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

            const valuesByType = taxonomyService.getValuesByTypeFromTaxonomy(taxonomy.children);
            expect(valuesByType).toHaveProperty("dc");
            expect(valuesByType).toHaveProperty("i");
            expect(valuesByType).toHaveProperty("ac");
            expect(valuesByType["dc"]).toHaveLength(1);
            expect(valuesByType["dc"][0]).toBe("kosice");
            expect(valuesByType["i"]).toHaveLength(2);
            expect(valuesByType["i"][0]).toBe("media");
            expect(valuesByType["i"][1]).toBe("retail");
            expect(valuesByType["ac"]).toHaveLength(1);
            expect(valuesByType["ac"][0]).toBe("matrix");
        })
    });
});
