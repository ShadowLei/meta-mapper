

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any
} from "../src";
import { MetaUtil, ObjectUtil } from "../src/util";


@mc
class MyGeneric<T> {
    @mp
    key: string;

    @mp
    val: T;

    @mp
    nos: number | string;
}

@mc
class MyData {
    @mp
    name: string;

    @mp
    val: number;
}

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
            assert.strictEqual(mc.name, "MyGeneric");

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
            assert.strictEqual(p2.name, "val");
            assert.strictEqual(p2.rawType, Object);
            assert.strictEqual(p2.metaTypes.length, 0);
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
    });
});