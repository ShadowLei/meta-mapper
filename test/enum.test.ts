

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper
} from "../src/";
import { MetaUtil, ObjectUtil } from "../src/util";

enum MyEnum {
    A = 1,
    B = 2,
    C = 3
}

@mc
class MyCls {
    @mp("", Enum, () => MyEnum)
    eObj: MyEnum;

    @mp("", Enum, () => [1, "xa", "c"])
    eArr: MyEnum;
}


const mapper = new MetaMapper();

describe("Enum Test", function () {

    describe("Enum Test", function () {
        it("case 0", () => {
            let p: MyCls = {
                eObj: null,
                eArr: null
            };

            let rtn = mapper.map(MyCls, p);

            let pAssert = {
            };
            
            assert.strictEqual(rtn.rtn instanceof MyCls, true);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 1", () => {
            let p = {
                eObj: "B",
                eArr: "xa"
            };

            let rtn = mapper.map(MyCls, p);

            let pAssert = {
                eObj: MyEnum.B,
                eArr: "xa"
            };
            
            assert.strictEqual(rtn.rtn instanceof MyCls, true);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 2", () => {
            let p = {
                eObj: "1",
                eArr: 1
            };

            let rtn = mapper.map(MyCls, p);

            let pAssert = {
                eObj: MyEnum.A,
                eArr: 1
            };
            
            assert.strictEqual(rtn.rtn instanceof MyCls, true);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 3", () => {
            let p = {
                eObj: "4",
                eArr: 4
            };

            let rtn = mapper.map(MyCls, p);

            let pAssert = {
            };
            
            assert.strictEqual(rtn.rtn instanceof MyCls, true);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
            assert.strictEqual(rtn.errors.length, 2);
            assert.strictEqual(rtn.errors[0].name, "MyCls.eObj");
            assert.strictEqual(rtn.errors[0].code, "EnumMapper");
            assert.strictEqual(rtn.errors[1].name, "MyCls.eArr");
            assert.strictEqual(rtn.errors[1].code, "EnumMapper");
        });

        it("case 3", () => {
            let p = {
                eObj: MyEnum,
                eArr: [1]
            };

            let rtn = mapper.map(MyCls, p);

            let pAssert = {
            };

            console.log(rtn);
            
            assert.strictEqual(rtn.rtn instanceof MyCls, true);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
            assert.strictEqual(rtn.errors.length, 2);
            assert.strictEqual(rtn.errors[0].name, "MyCls.eObj");
            assert.strictEqual(rtn.errors[0].code, "EnumMapper");
            assert.strictEqual(rtn.errors[1].name, "MyCls.eArr");
            assert.strictEqual(rtn.errors[1].code, "EnumMapper");
        });
    });
});