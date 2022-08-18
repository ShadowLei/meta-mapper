
import { assert } from "chai";
import {
    mc, mp, mv_string, mv_number,
    Enum, Any
} from "../src/";
import { MetaUtil, ObjectUtil } from "../src/util";

@mc("paginger")
class Paging {
    @mp
    @mv_number(0, 100, false, "test.paging.offset", "Must between [0 ~ 100]")
    offset: number;

    @mp
    @mv_number(1, 20, false, "test.paging.limit", "Must between [0 ~ 20]")
    limit: number;

    @mp
    date: Date;
}

enum MyEnum {
    A = 0,
    B = 1,
    C = 2
}

enum MyEnumE {
    A = 0,
    B = 1,
    C = 2,
    K = "MyK"
}

@mc("")
class MyInnerInner_Base {
    @mp
    aaa: string;

    @mp("bbb", Any)
    bbb: any;

    @mp
    num: number;
}

@mc("", MyInnerInner_Base)
class MyInnerInner extends MyInnerInner_Base {

    @mp
    id: number;

    @mp
    code: string;
}

@mc("", MyInnerInner)
class MyClassDetail extends MyInnerInner {

    @mp
    id: number;

    @mp
    code: string;

    @mp("")
    innerinner: MyInnerInner;

    @mp("", Array, MyInnerInner)
    innerList: Array<MyInnerInner>;

    @mp("", Enum, () => MyEnumE)
    e: MyEnumE;

    @mp("MyNotNullStr")
    @mv_string(1, 10, false, "the-not-null-str", "!!! Custom Error !!!")
    @mv_string(1, 10, false)
    notNullStr: string;
}

//@mc
@mc
class MyClass {
    @mp
    @mp("", Enum, () => MyEnum)
    e: MyEnum;

    @mp(null, Enum, () => MyEnum)
    e1: MyEnum;

    @mp
    eStr: string;

    @mp("shadow_name_info")
    @mv_string(1, 10, false, "prop.shadow.name", "Must between 1 ~ 10")
    shadowName: string;

    @mp(null, String)
    date: Date;

    @mp
    detail: MyClassDetail;

    @mp("shadow_id")
    shadowId: number;

    @mp("extra", Any)
    extra: any;

    @mp("none")
    noneNum: number;

    outter: number;

    @mp("", Array, String)
    strs: string[];

    @mp("enums", Array, Enum, () => MyEnum)
    enums: MyEnum[];

    @mp("test_arr", Array, Array, Enum, () => MyEnumE)
    arrs: Array<Array<MyEnum>>;
}

@mc
//@mp
class ErrDefineClass {
}

describe("Define Test", function () {

    describe("ErrDefineClass", function () {
        it("case 0", () => {
            let p = new ErrDefineClass();
            assert.strictEqual(p instanceof ErrDefineClass, true);

            //@mc("paginger")
            let mc = MetaUtil.tryGetMC(ErrDefineClass);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, ErrDefineClass);
            assert.strictEqual(mc.metaTypes.length, 0);
            assert.strictEqual(mc.properties.length, 0);
            assert.strictEqual(mc.key, "ErrDefineClass");
            assert.strictEqual(mc.name, "ErrDefineClass");
        });
    });

    describe("Paging", function () {
        it("case 0", () => {
            let p = new Paging();
            assert.strictEqual(p instanceof Paging, true);

            //@mc("paginger")
            let mc = MetaUtil.tryGetMC(Paging);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, Paging);
            assert.strictEqual(mc.metaTypes.length, 0);
            assert.strictEqual(mc.properties.length, 3);
            assert.strictEqual(mc.key, "Paging");
            assert.strictEqual(mc.name, "paginger");

            //@mp
            //@mv_number(0, 100, false, "test.paging.offset", "0~100之间")
            //offset: number;
            let p1 = mc.properties.find(m => m.key === "limit");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "limit");
            assert.strictEqual(p1.name, "limit");
            assert.strictEqual(p1.rawType, Number);
            assert.strictEqual(p1.metaTypes.length, 0);
            assert.strictEqual(p1.validators.length, 1);

            //@mp
            //@mv_number(1, 20, false, "test.paging.limit", "0~20之间")
            //limit: number;
            let p2 = mc.properties.find(m => m.key === "offset");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p2), false);
            assert.strictEqual(p2.key, "offset");
            assert.strictEqual(p2.name, "offset");
            assert.strictEqual(p2.rawType, Number);
            assert.strictEqual(p2.metaTypes.length, 0);
            assert.strictEqual(p2.validators.length, 1);

            //@mp
            //date: Date;
            let p3 = mc.properties.find(m => m.key === "date");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p3), false);
            assert.strictEqual(p3.key, "date");
            assert.strictEqual(p3.name, "date");
            assert.strictEqual(p3.rawType, Date);
            assert.strictEqual(p3.metaTypes.length, 0);
            assert.strictEqual(p3.validators.length, 0);
        });
    });
    
    describe("MyClass", function () {
        it("case 0", () => {
            let c = new MyClass();
            assert.strictEqual(c instanceof MyClass, true);

            //@mc
            let mc = MetaUtil.tryGetMC(MyClass);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, MyClass);
            assert.strictEqual(mc.metaTypes.length, 0);
            assert.strictEqual(mc.properties.length, 12);
            assert.strictEqual(mc.key, "MyClass");
            assert.strictEqual(mc.name, "MyClass");

            //@mp("", Enum, () => MyEnum)
            //e: MyEnum;
            let p1 = mc.properties.find(m => m.key === "e");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "e");
            assert.strictEqual(p1.name, "e");
            assert.strictEqual(p1.rawType, Number);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p1.metaTypes.length, 2);
            assert.strictEqual(p1.metaTypes[0], Enum);
            assert.strictEqual(p1.metaTypes[1](), MyEnum);
            assert.strictEqual(p1.validators.length, 0);

            //@mp("", Enum, () => MyEnum)
            //e1: MyEnum;
            let p2 = mc.properties.find(m => m.key === "e1");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p2), false);
            assert.strictEqual(p2.key, "e1");
            assert.strictEqual(p2.name, "e1");
            assert.strictEqual(p2.rawType, Number);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p2.metaTypes.length, 2);
            assert.strictEqual(p2.metaTypes[0], Enum);
            assert.strictEqual(p2.metaTypes[1](), MyEnum);
            assert.strictEqual(p2.validators.length, 0);

            //@mp
            //eStr: string;
            let p3 = mc.properties.find(m => m.key === "eStr");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p3), false);
            assert.strictEqual(p3.key, "eStr");
            assert.strictEqual(p3.name, "eStr");
            assert.strictEqual(p3.rawType, String);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p3.metaTypes.length, 0);
            assert.strictEqual(p3.validators.length, 0);

            //@mp("shadow_name_info")
            //@mv_string(1, 10, false, "prop.shadow.name", "Must between 1 ~ 10")
            //shadowName: string;
            let p4 = mc.properties.find(m => m.key === "shadowName");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p4), false);
            assert.strictEqual(p4.key, "shadowName");
            assert.strictEqual(p4.name, "shadow_name_info");
            assert.strictEqual(p4.rawType, String);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p4.metaTypes.length, 0);
            assert.strictEqual(p4.validators.length, 1);
            assert.strictEqual(p4.validators[0].validateFunc.name, "validate");
            assert.strictEqual(p4.validators[0].params.length, 3);

            //@mp(null, String)
            //date: Date;
            let p5 = mc.properties.find(m => m.key === "date");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p5), false);
            assert.strictEqual(p5.key, "date");
            assert.strictEqual(p5.name, "date");
            assert.strictEqual(p5.rawType, Date);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p5.metaTypes.length, 1);
            assert.strictEqual(p5.metaTypes[0], String);
            assert.strictEqual(p5.validators.length, 0);

            //@mp
            //detail: MyClassDetail;
            let p6 = mc.properties.find(m => m.key === "detail");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p6), false);
            assert.strictEqual(p6.key, "detail");
            assert.strictEqual(p6.name, "detail");
            assert.strictEqual(p6.rawType, MyClassDetail);
            assert.strictEqual(p6.metaTypes.length, 0);
            assert.strictEqual(p6.validators.length, 0);

            //@mp("shadow_id")
            //shadowId: number;
            let p7 = mc.properties.find(m => m.key === "shadowId");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p7), false);
            assert.strictEqual(p7.key, "shadowId");
            assert.strictEqual(p7.name, "shadow_id");
            assert.strictEqual(p7.rawType, Number);
            assert.strictEqual(p7.metaTypes.length, 0);
            assert.strictEqual(p7.validators.length, 0);

            //@mp("extra", Any)
            //extra: any;
            let p8 = mc.properties.find(m => m.key === "extra");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p8), false);
            assert.strictEqual(p8.key, "extra");
            assert.strictEqual(p8.name, "extra");
            assert.strictEqual(p8.rawType, Object);
            assert.strictEqual(p8.metaTypes.length, 1);
            assert.strictEqual(p8.metaTypes[0], Any);
            assert.strictEqual(p8.validators.length, 0);

            //@mp("none")
            //noneNum: number;
            let p9 = mc.properties.find(m => m.key === "noneNum");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p9), false);
            assert.strictEqual(p9.key, "noneNum");
            assert.strictEqual(p9.name, "none");
            assert.strictEqual(p9.rawType, Number);
            assert.strictEqual(p9.metaTypes.length, 0);
            assert.strictEqual(p9.validators.length, 0);

            //outter: number;
            let p10 = mc.properties.find(m => m.key === "outter");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p10), true);

            //@mp("", Array, String)
            //strs: string[];
            let p11 = mc.properties.find(m => m.key === "strs");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p11), false);
            assert.strictEqual(p11.key, "strs");
            assert.strictEqual(p11.name, "strs");
            assert.strictEqual(p11.rawType, Array);
            assert.strictEqual(p11.metaTypes.length, 2);
            assert.strictEqual(p11.metaTypes[0], Array);
            assert.strictEqual(p11.metaTypes[1], String);
            assert.strictEqual(p11.validators.length, 0);

            //@mp("enums", Array, Enum, () => MyEnum)
            //enums: MyEnum[];
            let p13 = mc.properties.find(m => m.key === "enums");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p13), false);
            assert.strictEqual(p13.key, "enums");
            assert.strictEqual(p13.name, "enums");
            assert.strictEqual(p13.rawType, Array);
            assert.strictEqual(p13.metaTypes.length, 3);
            assert.strictEqual(p13.metaTypes[0], Array);
            assert.strictEqual(p13.metaTypes[1], Enum);
            assert.strictEqual(typeof p13.metaTypes[2], "function");
            assert.strictEqual(p13.metaTypes[2] === Function, false);
            assert.strictEqual(p13.metaTypes[2](), MyEnum);
            assert.strictEqual(p13.validators.length, 0);

            //@mp("test_arr", Array, Array, Enum, () => MyEnumE)
            //arrs: Array<Array<MyEnum>>;
            let p14 = mc.properties.find(m => m.key === "arrs");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p14), false);
            assert.strictEqual(p14.key, "arrs");
            assert.strictEqual(p14.name, "test_arr");
            assert.strictEqual(p14.rawType, Array);
            assert.strictEqual(p14.metaTypes.length, 4);
            assert.strictEqual(p14.metaTypes[0], Array);
            assert.strictEqual(p14.metaTypes[1], Array);
            assert.strictEqual(p14.metaTypes[2], Enum);
            assert.strictEqual(typeof p14.metaTypes[2], "function");
            assert.strictEqual(p14.metaTypes[2] === Function, false);
            assert.strictEqual(p14.metaTypes[3](), MyEnumE);
            assert.strictEqual(p14.validators.length, 0);
        });

        it("case 1", () => {
            let c = new MyClassDetail();
            assert.strictEqual(c instanceof MyClassDetail, true);
            assert.strictEqual(c instanceof MyInnerInner, true);

            //@mc("", MyInnerInner)
            let mc = MetaUtil.tryGetMC(MyClassDetail);
            assert.strictEqual(ObjectUtil.isNullOrUndefined(mc), false);
            assert.strictEqual(mc.rawType, MyClassDetail);
            assert.strictEqual(mc.metaTypes.length, 1);
            assert.strictEqual(mc.metaTypes[0], MyInnerInner);
            assert.strictEqual(mc.properties.length, 6);
            assert.strictEqual(mc.key, "MyClassDetail");
            assert.strictEqual(mc.name, "MyClassDetail");

            /*
            let p1 = mc.properties.find(m => m.key === "e");
            assert.strictEqual(ObjectUtil.isNullOrUndefined(p1), false);
            assert.strictEqual(p1.key, "e");
            assert.strictEqual(p1.name, "e");
            assert.strictEqual(p1.rawType, Number);          //NOTE: a Enum can be either "Object" or "Number" when on reflecting
            assert.strictEqual(p1.metaTypes.length, 2);
            assert.strictEqual(p1.metaTypes[0], Enum);
            assert.strictEqual(p1.metaTypes[1](), MyEnum);
            assert.strictEqual(p1.validators.length, 0);
            */

            //@mc("", MyInnerInner_Base)
                //@mp
                //id: number;

                //@mp
                //code: string;

            //@mc("", MyInnerInner)
                //@mp
                //id: number;

                //@mp
                //code: string;

                //@mp("")
                //innerinner: MyInnerInner;

                //@mp("", Array, MyInnerInner)
                //innerList: Array<MyInnerInner>;

                //@mp("", Enum, () => MyEnumE)
                //e: MyEnumE;

                //@mp("MyNotNullStr")
                //@mv_string(1, 10, false, "the-not-null-str", "!!! Custom Error !!!")
                //@mv_string(1, 10, false)
                //notNullStr: string;
        });
    });
});