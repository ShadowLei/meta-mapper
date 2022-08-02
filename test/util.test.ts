
import { assert } from "chai";
import { EnumUtil, ObjectUtil } from "../src/util";


enum N {
    A = 0,
    B = 1,
    C = 2
}

enum S {
    A = "A",
    B = "BB",
    C = "C",
}

enum Mix {
    A = "A",
    B = "BB",
    C = "X",
    N = 0,
    K = 1
}

describe("Util Test", function () {

    describe("EnumUtil", function () {
        it("case 0", () => {
            let m = EnumUtil.tryMatch(N, "A");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.A);

            m = EnumUtil.tryMatch(N, "B");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.B);

            m = EnumUtil.tryMatch(N, "C");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.C);

            m = EnumUtil.tryMatch(N, "D");
            assert.strictEqual(m.match, false);
        });

        it("case 1", () => {
            let m = EnumUtil.tryMatch(N, 0);
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.A);

            m = EnumUtil.tryMatch(N, 1);
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.B);

            m = EnumUtil.tryMatch(N, 2);
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.C);

            m = EnumUtil.tryMatch(N, 3);
            assert.strictEqual(m.match, false);

            m = EnumUtil.tryMatch(N, -1);
            assert.strictEqual(m.match, false);
        });

        it("case 2", () => {
            let m = EnumUtil.tryMatch(N, "0");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.A);

            m = EnumUtil.tryMatch(N, "1");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.B);

            m = EnumUtil.tryMatch(N, "2");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, N.C);

            m = EnumUtil.tryMatch(N, "3");
            assert.strictEqual(m.match, false);

            m = EnumUtil.tryMatch(N, "-1");
            assert.strictEqual(m.match, false);
        });

        it("case 3", () => {
            let m = EnumUtil.tryMatch(S, "A");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, S.A);

            m = EnumUtil.tryMatch(S, "B");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, S.B);

            m = EnumUtil.tryMatch(S, "BB");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, S.B);

            m = EnumUtil.tryMatch(S, "C");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, S.C);

            m = EnumUtil.tryMatch(S, "D");
            assert.strictEqual(m.match, false);

            m = EnumUtil.tryMatch(S, "0");
            assert.strictEqual(m.match, false);
        });

        it("case 4", () => {
            let m = EnumUtil.tryMatch(Mix, "A");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.A);

            m = EnumUtil.tryMatch(Mix, "B");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.B);

            m = EnumUtil.tryMatch(Mix, "BB");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.B);

            m = EnumUtil.tryMatch(Mix, "C");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.C);

            m = EnumUtil.tryMatch(Mix, "X");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.C);

            m = EnumUtil.tryMatch(S, "D");
            assert.strictEqual(m.match, false);

            m = EnumUtil.tryMatch(S, "-1");
            assert.strictEqual(m.match, false);

            m = EnumUtil.tryMatch(Mix, "N");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.N);

            m = EnumUtil.tryMatch(Mix, 0);
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.N);

            m = EnumUtil.tryMatch(Mix, "K");
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.K);

            m = EnumUtil.tryMatch(Mix, 1);
            assert.strictEqual(m.match, true);
            assert.strictEqual(m.val, Mix.K);
        });

    });
});
