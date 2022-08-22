

import { assert } from "chai";
import {
    mc, mp,
    Enum, MetaMapper, mv_number, MetaMapOn, mv_not_null_or_undefined, mv_string, mv_custom
} from "../src";
import { BooleanUtil, NumberUtil, ObjectUtil } from "../src/util";

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


function my_validate_number_about(val: number, aboutNum?: number): boolean {
    if (ObjectUtil.isNullOrUndefined(val)) { return true; }

    aboutNum = NumberUtil.asDefault(aboutNum, 100);
    if (val >= aboutNum - 5 && val <= aboutNum + 5) {
        return true;
    }

    return false;
}

function my_validate_string_all_digital(val: string): boolean {
    if (ObjectUtil.isNullOrUndefined(val)) { return true; }

    if (val.length <= 0) { return false; }

    for (let idx = 0; idx < val.length; idx++) {
        let c = val.charCodeAt(idx);
        if (c < 48 || c > 57) { return false; }
    }

    return true;
}

@mc("my_c")
class Custom {
    @mp("co")
    @mv_custom(my_validate_string_all_digital, [100], "the-code", "the-code must be about 100")
    code: string;

    @mp("vl")
    @mv_custom(my_validate_number_about, [], "the-val", "val must be all digital number")
    val: number;

    @mp("vlx")
    @mv_custom(my_validate_number_about)
    valx: number;
}

const mapper = new MetaMapper({ to: MetaMapOn.MetaName });

describe("Validation - Test", function () {
    
    describe("mv", function () {
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
            assert.strictEqual(p.errors[2].name, "Paging.data.$[1].code");
            assert.strictEqual(p.errors[2].reason, "isNotNullOrUndefined()");
            
            assert.strictEqual(p.errors[3].code, "Validation");
            assert.strictEqual(p.errors[3].name, "Paging.data.$[1].val");
            assert.strictEqual(p.errors[3].reason, "isNotNullOrUndefined()");

            assert.strictEqual(p.errors[4].code, "value - vcode");
            assert.strictEqual(p.errors[4].name, "Paging.data.$[2].val");
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
            assert.strictEqual(p.errors[2].name, "Paging.data.$[1].code");
            assert.strictEqual(p.errors[2].reason, "must be [1-10]");
            
            assert.strictEqual(p.errors[3].code, "Validation");
            assert.strictEqual(p.errors[3].name, "Paging.data.$[2].code");
            assert.strictEqual(p.errors[3].reason, "isNotNullOrUndefined()");
        });
    });

    
    describe("mv_custom", function () {
        it("case 0", () => {
            let obj = {
                code: "abc",
                val: "def",
                valx: "123"
            };

            let p = mapper.map(Custom, obj);

            let pAssert = {
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(p.mapped, false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.errors.length, 3);
            assert.strictEqual(p.errors[0].code, "the-code");
            assert.strictEqual(p.errors[0].name, "Custom.code");
            assert.strictEqual(p.errors[0].reason, "the-code must be about 100");

            assert.strictEqual(p.errors[1].code, "NumberMapper");
            assert.strictEqual(p.errors[1].name, "Custom.val");
            assert.strictEqual(p.errors[1].reason, `Not a validate number: ${obj.val}`);

            assert.strictEqual(p.errors[2].code, "Validation");
            assert.strictEqual(p.errors[2].name, "Custom.valx");
            assert.strictEqual(p.errors[2].reason, `my_validate_number_about(${obj.valx})`);
        });

        it("case 1", () => {
            let obj = {
                co: "abc",
                vl: "def",
                vlx: "123"
            };

            let opt = {
                from: MetaMapOn.MetaName,
                to: MetaMapOn.PropertyKey,
            };
            let p = new MetaMapper(opt).map(Custom, obj);

            let pAssert = {
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(p.mapped, false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.errors.length, 3);
            assert.strictEqual(p.errors[0].code, "the-code");
            assert.strictEqual(p.errors[0].name, "my_c.co");
            assert.strictEqual(p.errors[0].reason, "the-code must be about 100");

            assert.strictEqual(p.errors[1].code, "NumberMapper");
            assert.strictEqual(p.errors[1].name, "my_c.vl");
            assert.strictEqual(p.errors[1].reason, `Not a validate number: ${obj.vl}`);

            assert.strictEqual(p.errors[2].code, "Validation");
            assert.strictEqual(p.errors[2].name, "my_c.vlx");
            assert.strictEqual(p.errors[2].reason, `my_validate_number_about(${obj.vlx})`);
        });

        it("case 2", () => {
            let obj = {
                code: "123456789",
                val: "100",
                valx: "123"
            };

            let p = mapper.map(Custom, obj);

            let pAssert = {
                co: "123456789",
                vl: 100
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(p.mapped, false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.errors.length, 1);
            assert.strictEqual(p.errors[0].code, "Validation");
            assert.strictEqual(p.errors[0].name, "Custom.valx");
            assert.strictEqual(p.errors[0].reason, `my_validate_number_about(${obj.valx})`);
        });

        it("case 3", () => {
            let obj = {
                co: "123456789",
                vl: "100",
                vlx: "123"
            };

            let opt = {
                from: MetaMapOn.MetaName,
                to: MetaMapOn.PropertyKey,
            };
            let p = new MetaMapper(opt).map(Custom, obj);

            let pAssert = {
                code: "123456789",
                val: 100
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(p.mapped, false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.errors.length, 1);
            assert.strictEqual(p.errors[0].code, "Validation");
            assert.strictEqual(p.errors[0].name, "my_c.vlx");
            assert.strictEqual(p.errors[0].reason, `my_validate_number_about(${obj.vlx})`);
        });
    });
});