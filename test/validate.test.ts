

import { assert } from "chai";
import {
    mc, mp,
    Enum, MetaMapper, mv_number, MetaMapOn, mv_not_null_or_undefined, mv_string
} from "../src";
import { ObjectUtil } from "../src/util";

@mc
class PagingData {
    @mp
    @mv_not_null_or_undefined
    @mv_string(1, 10, true, "coder", "must be [1-10]")
    code: string;

    @mp("value", Number)
    @mv_not_null_or_undefined
    @mv_number(1, 100, true, "value - vcode")
    val: string;
}

@mc("paging")
class Paging {
    @mp
    @mv_number(0, 100, false, "test.paging.offset", "Must between [0 ~ 100]")
    offset: number;

    @mp
    @mv_not_null_or_undefined
    @mv_number(1, 20, false, "test.paging.limit", "Must between [0 ~ 20]")
    limit: number;

    @mp()
    @mv_not_null_or_undefined
    date: Date;

    @mp("", Array, PagingData)
    data: PagingData[];
}

const mapper = new MetaMapper({ to: MetaMapOn.MetaName });

describe("Validation - Test", function () {
    
    describe("validate", function () {
        it("case 0", () => {
            let obj = {
                offset: 0,
                limit: "20",
                date: "2022-01-01 09:10:00+08:00",
                value: 100,
                data: [{ code: "s-001", val: "001" },
                    { code: "s-002", val: "002" }
                ]
            };

            let p = mapper.map(Paging, obj);

            let pAssert = {
                offset: 0,
                limit: 20,
                date: new Date("2022-01-01T01:10:00.000Z"),
                data: [
                    { code: "s-001", value: 1 },
                    { code: "s-002", value: 2 }
                ]
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.rtn.date instanceof Date, true);
            assert.strictEqual(p.mapped, true);
            assert.strictEqual(p.errors.length, 0);
        });

        it("case 1", () => {
            let obj = {
                offset: 0,
                limit: "21",
                date: null,
                value: 100,
                data: [{ code: "s-001", val: "001" },
                    { code: null, val: null },
                    { code: "s-003", val: "333" }
                ]
            };

            let p = mapper.map(Paging, obj);

            let pAssert = {
                offset: 0,
                data: [
                    { code: "s-001", value: 1 },
                    { },
                    { code: "s-003" }
                ]
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            
            assert.strictEqual(p.errors.length, 5);

            assert.strictEqual(p.errors[0].code, "test.paging.limit");
            assert.strictEqual(p.errors[0].name, "Paging.limit");
            assert.strictEqual(p.errors[0].reason, "Must between [0 ~ 20]");

            assert.strictEqual(p.errors[1].code, "Validation");
            assert.strictEqual(p.errors[1].name, "Paging.date");
            assert.strictEqual(p.errors[1].reason, "isNotNullOrUndefined()");

            assert.strictEqual(p.errors[2].code, "Validation");
            assert.strictEqual(p.errors[2].name, "Paging.data.$[1].PagingData.code");
            assert.strictEqual(p.errors[2].reason, "isNotNullOrUndefined()");
            
            assert.strictEqual(p.errors[3].code, "Validation");
            assert.strictEqual(p.errors[3].name, "Paging.data.$[1].PagingData.val");
            assert.strictEqual(p.errors[3].reason, "isNotNullOrUndefined()");

            assert.strictEqual(p.errors[4].code, "value - vcode");
            assert.strictEqual(p.errors[4].name, "Paging.data.$[2].PagingData.val");
            assert.strictEqual(p.errors[4].reason, "validate(333, 1, 100, true)");
        });


        it("case 2", () => {
            let obj = {
                offset: 0,
                limit: "21",
                date: null,
                value: 100,
                data: [
                    { code: "s-001", val: "001" },
                    { code: "s-003-012356789", val: "002" },
                    { code: null, val: 3 },
                ]
            };

            let p = mapper.map(Paging, obj);

            let pAssert = {
                offset: 0,
                data: [
                    { code: "s-001", value: 1 },
                    { value: 2 },
                    { value: 3 },
                ]
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            
            assert.strictEqual(p.errors.length, 4);

            assert.strictEqual(p.errors[0].code, "test.paging.limit");
            assert.strictEqual(p.errors[0].name, "Paging.limit");
            assert.strictEqual(p.errors[0].reason, "Must between [0 ~ 20]");

            assert.strictEqual(p.errors[1].code, "Validation");
            assert.strictEqual(p.errors[1].name, "Paging.date");
            assert.strictEqual(p.errors[1].reason, "isNotNullOrUndefined()");

            assert.strictEqual(p.errors[2].code, "coder");
            assert.strictEqual(p.errors[2].name, "Paging.data.$[1].PagingData.code");
            assert.strictEqual(p.errors[2].reason, "must be [1-10]");
            
            assert.strictEqual(p.errors[3].code, "Validation");
            assert.strictEqual(p.errors[3].name, "Paging.data.$[2].PagingData.code");
            assert.strictEqual(p.errors[3].reason, "isNotNullOrUndefined()");
        });
    });
});