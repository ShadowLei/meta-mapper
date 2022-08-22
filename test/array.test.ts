

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper, MetaMapOn
} from "../src";
import { MetaUtil, ObjectUtil } from "../src/util";

@mc
class Inner {
    @mp
    name: string;

    @mp
    val: number;

    @mp
    index?: number;
}

enum MyE {
    A = 0,
    B = 1,
    C = 2
}

@mc("", Inner)
class MyData extends Inner {
    @mp
    name: string;

    @mp
    val: number;

    @mp("", Array, Inner)
    arr: Array<Inner>;

    @mp("", Array, Array, Inner)
    arr2: Array<Array<Inner>>;

    @mp("", Array, Array, Array, Inner)
    arr3: Array<Array<Array<Inner>>>;

    @mp("e", Array, Array, Array, Enum, () => MyE)
    arr3Enum: Array<Array<Array<MyE>>>;
}

const mapper = new MetaMapper();

describe("Array Test", function () {

    describe("Define Test", function () {
        it("case 0", () => {
            let mc = MetaUtil.tryGetMC(MyData);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, MyData);
            assert.strictEqual(mc.metaTypes.length, 1);
            assert.strictEqual(mc.metaTypes[0], Inner);
            assert.strictEqual(mc.properties.length, 6);
            assert.strictEqual(mc.key, "MyData");
            assert.strictEqual(mc.name, "MyData");

            //@mp
            //name: string;
            let p1 = mc.properties.find(m => m.key === "name");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "name");
            assert.strictEqual(p1.name, "name");
            assert.strictEqual(p1.rawType, String);
            assert.strictEqual(p1.inspectType, String);
            assert.strictEqual(p1.metaTypes.length, 0);
        
            //@mp
            //val: number;
            let p2 = mc.properties.find(m => m.key === "val");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p2), false);
            assert.strictEqual(p2.key, "val");
            assert.strictEqual(p2.name, "val");
            assert.strictEqual(p2.rawType, Number);
            assert.strictEqual(p2.inspectType, Number);
            assert.strictEqual(p2.metaTypes.length, 0);
        
            //@mp("", Array, Inner)
            //arr: Array<Inner>;
            let p3 = mc.properties.find(m => m.key === "arr");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p3), false);
            assert.strictEqual(p3.key, "arr");
            assert.strictEqual(p3.name, "arr");
            assert.strictEqual(p3.rawType, Array);
            assert.strictEqual(p3.inspectType, Array);
            assert.strictEqual(p3.metaTypes.length, 2);
            assert.strictEqual(p3.metaTypes[0], Array);
            assert.strictEqual(p3.metaTypes[1], Inner);
        
            //@mp("", Array, Array, Inner)
            //arr2: Array<Array<Inner>>;
            let p4 = mc.properties.find(m => m.key === "arr2");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p4), false);
            assert.strictEqual(p4.key, "arr2");
            assert.strictEqual(p4.name, "arr2");
            assert.strictEqual(p4.rawType, Array);
            assert.strictEqual(p4.inspectType, Array);
            assert.strictEqual(p4.metaTypes.length, 3);
            assert.strictEqual(p4.metaTypes[0], Array);
            assert.strictEqual(p4.metaTypes[1], Array);
            assert.strictEqual(p4.metaTypes[2], Inner);
        
            //@mp("", Array, Array, Array, Inner)
            //arr3: Array<Array<Array<Inner>>>;
            let p5 = mc.properties.find(m => m.key === "arr3");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p5), false);
            assert.strictEqual(p5.key, "arr3");
            assert.strictEqual(p5.name, "arr3");
            assert.strictEqual(p5.rawType, Array);
            assert.strictEqual(p5.inspectType, Array);
            assert.strictEqual(p5.metaTypes.length, 4);
            assert.strictEqual(p5.metaTypes[0], Array);
            assert.strictEqual(p5.metaTypes[1], Array);
            assert.strictEqual(p5.metaTypes[2], Array);
            assert.strictEqual(p5.metaTypes[3], Inner);
        
            //@mp("e", Array, Array, Array, Enum, () => MyE)
            //arr3Enum: Array<Array<Array<MyE>>>;
            let p6 = mc.properties.find(m => m.key === "arr3Enum");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p6), false);
            assert.strictEqual(p6.key, "arr3Enum");
            assert.strictEqual(p6.name, "e");
            assert.strictEqual(p6.rawType, Array);
            assert.strictEqual(p6.inspectType, Array);
            assert.strictEqual(p6.metaTypes.length, 5);
            assert.strictEqual(p6.metaTypes[0], Array);
            assert.strictEqual(p6.metaTypes[1], Array);
            assert.strictEqual(p6.metaTypes[2], Array);
            assert.strictEqual(p6.metaTypes[3], Enum);
            assert.strictEqual(p6.metaTypes[4] instanceof Function, true);
            assert.strictEqual(p6.metaTypes[4](), MyE);
        });

        it("case 1", () => {
            let mc = MetaUtil.tryGetMC(Inner);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, Inner);
            assert.strictEqual(mc.metaTypes.length, 0);
            assert.strictEqual(mc.properties.length, 3);
            assert.strictEqual(mc.key, "Inner");
            assert.strictEqual(mc.name, "Inner");

            //@mp
            //name: string;
            let p1 = mc.properties.find(m => m.key === "name");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "name");
            assert.strictEqual(p1.name, "name");
            assert.strictEqual(p1.rawType, String);
            assert.strictEqual(p1.inspectType, String);
            assert.strictEqual(p1.metaTypes.length, 0);

            //@mp
            //val: number;
            let p2 = mc.properties.find(m => m.key === "val");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p2), false);
            assert.strictEqual(p2.key, "val");
            assert.strictEqual(p2.name, "val");
            assert.strictEqual(p2.rawType, Number);
            assert.strictEqual(p2.inspectType, Number);
            assert.strictEqual(p2.metaTypes.length, 0);

            //@mp
            //index?: number;
            let p3 = mc.properties.find(m => m.key === "index");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p3), false);
            assert.strictEqual(p3.key, "index");
            assert.strictEqual(p3.name, "index");
            assert.strictEqual(p3.rawType, Number);
            assert.strictEqual(p3.inspectType, Number);
            assert.strictEqual(p3.metaTypes.length, 0);
        });
    });

    describe("Meta Mapper Test", function () {
        it("case 0", () => {
            let p = new MyData();
            p.name = "shadow";
            p.arr = [
                { name: "shadow", val: 123, index: 0 },
                { name: "allen", val: 456, index: -1 },
            ];

            let rtn = mapper.map(MyData, p);

            //@mc
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyData, true);
            assert.strictEqual(Object.keys(rtn.rtn).length, 2);
            assert.strictEqual(Object.values(rtn.rtn).length, 2);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(p));

            /*
            @mp
            name: string;
            
            @mp
            val: number;
        
            @mp("", Array, Inner)
            arr: Array<Inner>;
        
            @mp("", Array, Array, Inner)
            arr2: Array<Array<Inner>>;
        
            @mp("", Array, Array, Array, Inner)
            arr3: Array<Array<Array<Inner>>>;
        
            @mp("", Array, Array, Array, Enum, () => MyE)
            arr3Enum: Array<Array<Array<MyE>>>;
            */
        });

        it("case 1", () => {
            let p = new MyData();
            p.name = "shadow";
            p.arr = [
                { name: "shadow", val: 123 },
                { name: "allen", val: 456 }
            ];

            let rtn = mapper.map(MyData, p);

            //@mc
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyData, true);
            assert.strictEqual(Object.keys(rtn.rtn).length, 2);
            assert.strictEqual(Object.values(rtn.rtn).length, 2);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(p));
        });

        it("case 2", () => {
            let p = {
                name: 1234,
                val: "123",
                arr: [
                    { name: 1234, val: "123" },
                    { name: 222, val: "333" },
                    [123],
                    true
                ],
                arr2: [
                    { name: 1234, val: "123" },
                    [{ name: 222, val: "333" }],
                    "HitPoint",
                    true
                ]
            };

            let pAssert = {
                name: "1234",
                val: 123,
                arr: [
                    { name: "1234", val: 123 },
                    { name: "222", val: 333 },
                    null,
                    null
                ],
                arr2: [null, [{ name: "222", val: 333 }], null, null]
            };

            let rtn = mapper.map(MyData, p);
            //@mc
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            //assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.rtn instanceof MyData, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 3", () => {
            let p = {
                index: "22",
                name: 1234,
                val: "123",
                arr: [
                    { name: 1234, val: "123" },
                    { name: 222, val: "333" }
                ],
                arr2: [],
                arr3: [
                    [
                        [
                            { name: 1234, val: "123" },
                        ],
                        [
                            { a: 1234, b: "123" },
                            [],                                 //error-1
                            { a: 1234, b: "123" },
                        ]
                    ]
                ],
                e: [
                    [
                        [
                            MyE.A, MyE.B, MyE.C
                        ],
                        [
                            0, 1, 2
                        ],
                        [
                            [0, 1, 2]                           //error-2
                        ],
                        [
                            "A", "B", "C"
                        ],
                        [
                            "0", "1", "2"
                        ]
                    ]
                ]
            };

            let pAssert = {
                name: "1234",
                val: 123,
                index: 22,
                arr: [
                    { name: "1234", val: 123 },
                    { name: "222", val: 333 }
                ],
                arr2: [],
                arr3: [
                    [
                        [
                            { name: "1234", val: 123 },
                        ],
                        [
                            {},
                            null,
                            {}
                        ]
                    ]
                ],
                arr3Enum: [
                    [
                        [
                            MyE.A, MyE.B, MyE.C
                        ],
                        [
                            MyE.A, MyE.B, MyE.C
                        ],
                        [
                            null
                        ],
                        [
                            MyE.A, MyE.B, MyE.C
                        ],
                        [
                            MyE.A, MyE.B, MyE.C
                        ]
                    ]
                ]
            };

            let m = new MetaMapper({
                from: MetaMapOn.MetaName,
                to: MetaMapOn.PropertyKey
            });
            let rtn = m.map(MyData, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.rtn instanceof MyData, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));


            /*
                [
                    {
                      name: 'MyData.arr3.$[0].$[1].$[1]',
                      code: 'ObjectMapper',
                      reason: 'Data not an expected object: object | []'
                    },
                    {
                      name: 'MyData.e.$[0].$[2].$[0]',
                      code: 'EnumMapper',
                      reason: 'Value must be string | number: object | [0,1,2]'
                    }
                ]
            */
            assert.strictEqual(rtn.errors[0].name, "MyData.arr3.$[0].$[1].$[1]");
            assert.strictEqual(rtn.errors[0].code, "ObjectMapper");
            assert.strictEqual(rtn.errors[1].name, "MyData.e.$[0].$[2].$[0]");
            assert.strictEqual(rtn.errors[1].code, "EnumMapper");
        });
    });
});