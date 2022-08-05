

import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any, MetaMapper, MetaMapOn
} from "../src";

@mc
class Inner {
    @mp
    name: string;

    @mp
    val: number;

    @mp
    index?: number;
}

enum MyE {
    A = 0,
    B = 1,
    C = 2
}

@mc("", Inner)
class MyData extends Inner {
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

    @mp("e", Array, Array, Array, Enum, () => MyE)
    arr3Enum: Array<Array<Array<MyE>>>;
}

const mapper = new MetaMapper();

describe("Performance Test", function () {

    describe("P Test", function () {
        /*
        it("case 0", () => {
            let p = {
                index: 22,
                abc: "SDFDSF",
                name: 1234
            };

            //each: 
            //Min: 107(ms) / 100000(times) = 0.0011(ms) = 10(us)
            //Max: 119(ms) / 100000(times) = 0.0012(ms) = 12(us)
            let dStart = new Date().getTime();
            for (let i = 0; i < 100000; i++) {
                mapper.map(Inner, p);
            }
            let dEnd = new Date().getTime();

            let duration = (dEnd - dStart)
            console.info(duration);

            //@mc
            assert.strictEqual(duration <= 3000, true);
        });

        it("case 1", () => {
            let p = {
                index: 22,
                abc: "SDFDSF",
                name: 1234,
                val: "123",
                arr: [
                    { name: 1234, val: "123" },
                    { name: 222, val: "333" }
                ],
                arr2: [],
                arr3: [
                    [
                        [
                            { name: 1234, val: "123" },
                        ],
                        [
                            { a: 1234, b: "123" },
                            [],
                            { a: 1234, b: "123" },
                        ]
                    ]
                ],
                arr3Enum: [
                    [
                        [
                            MyE.A, MyE.B, MyE.C
                        ],
                        [
                            0, 1, 2
                        ],
                        [
                            [0, 1, 2]
                        ],
                        [
                            "A", "B", "C"
                        ],
                        [
                            "0", "1", "2"
                        ]
                    ]
                ]
            };

            //each: 
            //Min: 1605(ms) / 100000(times) = 0.016(ms) = 161(us)
            //Max: 2364(ms) / 100000(times) = 0.024(ms) = 236(us)
            let dStart = new Date().getTime();
            for (let i = 0; i < 100000; i++) {
                mapper.map(MyData, p);
            }
            let dEnd = new Date().getTime();

            let duration = (dEnd - dStart)
            console.info(duration);

            //@mc
            assert.strictEqual(duration <= 3000, true);
        });
        */
    });
});