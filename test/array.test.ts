

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper
} from "../src";
import { MetaUtil, ObjectUtil } from "../src/util";

@mc
class Inner {
    @mp
    name: string;

    @mp
    val: number;
}

enum MyE {
    A = 0,
    B = 1,
    C = 2
}

@mc
class MyData {
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
}

const mapper = new MetaMapper();

describe("Array Test", function () {

    describe("Meta Mapper", function () {
        it("case 0", () => {
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
                    { name: 222, val: "333" },
                    "DSf",
                    true
                ]
            };

            let pAssert = {
                name: "1234",
                val: 123,
                arr: [
                    { name: "1234", val: 123 },
                    { name: "222", val: 333 },
                    {},
                    {}
                ],
                arr2: [null, null, null, null]
            };

            let rtn = mapper.map(MyData, p);

            //@mc
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyData, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });
    });
});