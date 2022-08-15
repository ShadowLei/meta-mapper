
import { assert } from "chai";
import {
    MetaMapper
} from "../../src";
import { ObjectUtil } from "../../src/util";

describe("Primitive - Boolean", function () {

    describe("Boolean", function () {
        it("case 0", () => {
            let rtn = new MetaMapper().map(Boolean, "asdf");

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.rtn, false);
            assert.strictEqual(rtn.mapped, true);
        });

        it("case 1", () => {
            let rtn = new MetaMapper().map(Boolean, 123.456);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, true);
        });

        it("case 2", () => {
            let date = new Date("2022-01-01 04:00:04+08:00");
            let rtn = new MetaMapper().map(Boolean, date);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });

        it("case 3", () => {
            let rtn = new MetaMapper().map(Boolean, true);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, true);
        });

        it("case 4", () => {
            let rtn = new MetaMapper().map(Boolean, false);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, false);
        });

        it("case 5", () => {
            let rtn = new MetaMapper().map(Boolean, undefined);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, undefined);
        });

        it("case 6", () => {
            let rtn = new MetaMapper().map(Boolean, null);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, null);
        });

        it("case 7", () => {
            let rtn = new MetaMapper().map(Boolean, Date.parse("abc2022-01-01 04:00:04+08:00"));

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });

        it("case 8", () => {
            let rtn = new MetaMapper().map(Boolean, {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });

        it("case 9", () => {
            let rtn = new MetaMapper().map(Boolean, [1, 2, 3]);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });

        it("case 10", () => {
            let rtn = new MetaMapper().map(Boolean, []);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });

        it("case 11", () => {
            let rtn = new MetaMapper().map(Boolean, () => {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "BooleanMapper");
        });
    });
});