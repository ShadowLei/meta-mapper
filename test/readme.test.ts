

import { assert } from "chai";
import {
    mc, mp,
    Enum, MetaMapper, mv_number, MetaMapOn
} from "../src";
import { ObjectUtil } from "../src/util";

@mc
class PagingData {
    @mp
    code: string;

    @mp("value", Number)
    val: string;
}

@mc
class Paging {
    @mp
    @mv_number(0, 100, false, "test.paging.offset", "Must between [0 ~ 100]")
    offset: number;

    @mp
    @mv_number(1, 20, false, "test.paging.limit", "Must between [0 ~ 20]")
    limit: number;

    @mp
    date: Date;

    @mp("", Array, PagingData)
    data: PagingData[]
}

const mapper = new MetaMapper({ to: MetaMapOn.Meta });

describe("ReadMe - Test", function () {
    
    describe("ReadMe.md", function () {
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
                limit: 20,  //convert from String to Number
                date: new Date("2022-01-01T01:10:00.000Z"),    //convert from String to Date
                data: [
                    //nest data convert from "val" to "value", and type from String to Number
                    { code: "s-001", value: 1 },
                    { code: "s-002", value: 2 }
                ]
            };

            assert.strictEqual(ObjectUtil.isNullOrUndefined(p), false);
            assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
            assert.strictEqual(p.rtn.date instanceof Date, true);
        });
    });
});