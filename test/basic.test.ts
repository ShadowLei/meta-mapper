
import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper
} from "../src";
import { MetaUtil, ObjectUtil } from "../src/util";

describe("Map Test", function () {

    describe("String", function () {
        it("case 0", () => {
            let rtn = new MetaMapper().map(String, "fd123");

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, "fd123");
        });

        it("case 1", () => {
            let rtn = new MetaMapper().map(String, 123.456);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, "123.456");
        });

        it("case 2", () => {
            let rtn = new MetaMapper().map(String, new Date("2022-01-01 04:00:04+08:00"));

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, "2021-12-31T20:00:04.000Z");
        });

        it("case 3", () => {
            let rtn = new MetaMapper().map(String, true);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, "true");
        });

        it("case 4", () => {
            let rtn = new MetaMapper().map(String, false);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, "false");
        });

        it("case 5", () => {
            let rtn = new MetaMapper().map(String, undefined);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, undefined);
        });

        it("case 6", () => {
            let rtn = new MetaMapper().map(String, null);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, null);
        });

        it("case 7", () => {
            let rtn = new MetaMapper().map(String, Date.parse("abc2022-01-01 04:00:04+08:00"));

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
        });

        it("case 8", () => {
            let rtn = new MetaMapper().map(String, {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
        });

        it("case 9", () => {
            let rtn = new MetaMapper().map(String, [1, 2, 3]);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
        });

        it("case 10", () => {
            let rtn = new MetaMapper().map(String, []);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
        });

        it("case 11", () => {
            let rtn = new MetaMapper().map(String, () => {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "StringMapper");
        });
    });
});
