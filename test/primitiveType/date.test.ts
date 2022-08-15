
import { assert } from "chai";
import {
    MetaMapper
} from "../../src";
import { ObjectUtil } from "../../src/util";

describe("Primitive - Date", function () {

    describe("Date", function () {
        it("case 0", () => {
            let rtn = new MetaMapper().map(Date, "fd123");

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn.rtn), true);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 1", () => {
            let rtn = new MetaMapper().map(Date, 123.456);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof Date, true);
            assert.strictEqual(rtn.rtn.getTime(), 123);
        });

        it("case 2", () => {
            let date = new Date("2022-01-01 04:00:04+08:00");
            let rtn = new MetaMapper().map(Date, date);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof Date, true);
            assert.strictEqual(rtn.rtn.getTime(), date.getTime());
        });

        it("case 3", () => {
            let rtn = new MetaMapper().map(Date, true);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 4", () => {
            let rtn = new MetaMapper().map(Date, false);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 5", () => {
            let rtn = new MetaMapper().map(Date, undefined);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, undefined);
        });

        it("case 6", () => {
            let rtn = new MetaMapper().map(Date, null);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, null);
        });

        it("case 7", () => {
            let rtn = new MetaMapper().map(Date, Date.parse("abc2022-01-01 04:00:04+08:00"));

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 8", () => {
            let rtn = new MetaMapper().map(Date, {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 9", () => {
            let rtn = new MetaMapper().map(Date, [1, 2, 3]);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 10", () => {
            let rtn = new MetaMapper().map(Date, []);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });

        it("case 11", () => {
            let rtn = new MetaMapper().map(Date, () => {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "DateMapper");
        });
    });
});