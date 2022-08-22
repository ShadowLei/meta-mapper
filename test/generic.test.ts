

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper, Generic
} from "../src";
import { MetaUtil, ObjectUtil } from "../src/util";


@mc("my-generic")
class MyGeneric<T> {
    @mp
    key: string;

    @mp("star", Generic)
    val: T;

    @mp
    nos?: number | string;
}

@mc
class MyData {
    @mp
    name: string;

    @mp
    val: number;
}

const mapper = new MetaMapper();

describe("Generic Test", function () {

    describe("Meta Mapper", function () {
        it("case 0", () => {
            let p = new MyGeneric<MyData>();
            assert.strictEqual(p instanceof MyGeneric, true);

            //@mc
            let mc = MetaUtil.tryGetMC(MyGeneric);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.properties.length, 3);
            assert.strictEqual(mc.key, "MyGeneric");
            assert.strictEqual(mc.name, "my-generic");

            //@mp
            //key: string;
            let p1 = mc.properties.find(m => m.key === "key");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "key");
            assert.strictEqual(p1.name, "key");
            assert.strictEqual(p1.rawType, String);
            assert.strictEqual(p1.metaTypes.length, 0);
            assert.strictEqual(p1.validators.length, 0);

            //@mp
            //val: T;
            let p2 = mc.properties.find(m => m.key === "val");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p2), false);
            assert.strictEqual(p2.key, "val");
            assert.strictEqual(p2.name, "star");
            assert.strictEqual(p2.rawType, Object);
            assert.strictEqual(p2.metaTypes.length, 1);
            assert.strictEqual(p2.validators.length, 0);

            //@mp
            //nos: number | string;
            let p3 = mc.properties.find(m => m.key === "nos");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p3), false);
            assert.strictEqual(p3.key, "nos");
            assert.strictEqual(p3.name, "nos");
            assert.strictEqual(p3.rawType, Object);
            assert.strictEqual(p3.metaTypes.length, 0);
            assert.strictEqual(p3.validators.length, 0);
        });

        it("case 1", () => {
            let p = {
                key: 123,
                val: {
                    name: "shadow",
                    val: "123"
                }
            };

            let rtn = mapper.map<MyGeneric<MyData>>(MyGeneric, p, [
                {
                    name: "my-generic.star",
                    type: MyData
                }
            ]);

            let pAssert = {
                key: "123",
                val: {
                    name: "shadow",
                    val: 123
                }
            };

            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyGeneric, true);
            assert.strictEqual(rtn.rtn.val instanceof MyData, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 2", () => {
            let p = {
                key: 123,
                val: {
                    name: Object,
                    val: "p123"
                }
            };

            let rtn = mapper.map<MyGeneric<MyData>>(MyGeneric, p, [
                {
                    name: "my-generic.star",
                    type: MyData
                }
            ]);

            let pAssert = {
                key: "123",
                val: {
                }
            };
            //console.log(pAssert);
            //console.log(rtn);
        
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.rtn instanceof MyGeneric, true);
            assert.strictEqual(rtn.rtn.val instanceof MyData, true);
            assert.strictEqual(rtn.errors.length, 2);
            assert.strictEqual(rtn.errors[0].name, "MyGeneric.val.name");
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
            assert.strictEqual(rtn.errors[1].name, "MyGeneric.val.val");
            assert.strictEqual(rtn.errors[1].code, "NumberMapper");
            
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 3", () => {
            let p = {
                key: 123,
                val: "123"
            };

            let rtn = mapper.map<MyGeneric<Number>>(MyGeneric, p, [
                {
                    name: "my-generic.star",
                    type: Number
                }
            ]);

            let pAssert = {
                key: "123",
                val: 123
            };
        
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyGeneric, true);
            assert.strictEqual(typeof rtn.rtn.val, "number");
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 4", () => {
            let p = {
                key: 123,
                val: "TRUE"
            };

            let rtn = mapper.map<MyGeneric<Boolean>>(MyGeneric, p, [
                {
                    name: "my-generic.star",
                    type: Boolean
                }
            ]);

            let pAssert: MyGeneric<Boolean> = {
                key: "123",
                val: true
            };
        
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyGeneric, true);
            assert.strictEqual(typeof rtn.rtn.val, "boolean");
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });
    });
});