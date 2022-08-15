
import { assert } from "chai";
import {
    MetaMapper
} from "../../src";
import { ObjectUtil } from "../../src/util";

describe("Primitive - Number", function () {

    describe("Number", function () {
        it("case 0", () => {
            let rtn = new MetaMapper().map(Number, "fd123");

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn.rtn), true);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });

        it("case 1", () => {
            let rtn = new MetaMapper().map(Number, 123.456);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, 123.456);
        });

        it("case 2", () => {
            let date = new Date("2022-01-01 04:00:04+08:00");
            let rtn = new MetaMapper().map(Number, date);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, date.getTime());
        });

        it("case 3", () => {
            let rtn = new MetaMapper().map(Number, true);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, 1);
        });

        it("case 4", () => {
            let rtn = new MetaMapper().map(Number, false);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, 0);
        });

        it("case 5", () => {
            let rtn = new MetaMapper().map(Number, undefined);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, undefined);
        });

        it("case 6", () => {
            let rtn = new MetaMapper().map(Number, null);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn, null);
        });

        it("case 7", () => {
            let rtn = new MetaMapper().map(Number, Date.parse("abc2022-01-01 04:00:04+08:00"));

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });

        it("case 8", () => {
            let rtn = new MetaMapper().map(Number, {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });

        it("case 9", () => {
            let rtn = new MetaMapper().map(Number, [1, 2, 3]);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });

        it("case 10", () => {
            let rtn = new MetaMapper().map(Number, []);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });

        it("case 11", () => {
            let rtn = new MetaMapper().map(Number, () => {});

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.errors.length, 1);
            assert.strictEqual(rtn.errors[0].code, "NumberMapper");
        });
    });
});