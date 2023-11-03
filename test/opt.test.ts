
import { assert } from "chai";
import {
    mc, mp,
    Enum, MetaMapper
} from "../src";
import { ObjectUtil } from "../src/util";

@mc("paginger")
class Paging {
    @mp
    offset: number;

    @mp
    limit: number;

    @mp
    date: Date;
}

enum MyStatusEnum {
    Init = 0,
    Pending = 1,
    Complete = 2
}

@mc("detail")
class MyClassDetail {
    @mp("cls-name", String)
    name: string;

    @mp
    value: number;
}

@mc("my-class")
class MyClass {
    @mp
    id: string;

    @mp
    val: string;

    @mp
    theid: string;

    @mp
    orderid: string;

    @mp
    detail: MyClassDetail;

    @mp("", Enum, () => MyStatusEnum)
    status: MyStatusEnum;

    @mp("create_date", Date)
    createDate: Date;

    @mp("update_date", String)
    updateDate: Date;

    @mp("date_str", String)
    date: Date;
}

@mc
//@mp
class ErrDefineClass {
}


describe("Option - KeeyNull", function () {

    const mapper = new MetaMapper({
        keepNullVal: true
    });

    describe("Paging", function () {
        it("case 0", () => {
            let p: Paging = {
                offset: 0,
                limit: 100,
                date: null
            };

            let rtn = mapper.map(Paging, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(Object.keys(rtn).length, 3);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn === p, false);
            assert.strictEqual(rtn.rtn instanceof Paging, true);
            assert.strictEqual(JSON.stringify(p), JSON.stringify(rtn.rtn));
        });

        it("case 1", () => {
            let date = new Date();

            let p = {
                offset: "-1",
                limit: "100",
                date: date.getTime(),
                ookk: null
            };

            let pAssert = {
                offset: -1,
                limit: 100,
                date: date
            };

            let rtn = mapper.map(Paging, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(Object.keys(rtn).length, 3);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof Paging, true);
            assert.strictEqual(JSON.stringify(pAssert), JSON.stringify(rtn.rtn));
        });

    });

    describe("MyClass", function () {
        it("case 0", () => {
            let p = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: null,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let pAssert = {
                //@mp
                //id: string;
                id: "123",

                //@mp
                //val: string;
                val: "456789",

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: null,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: "true",
                
                    //@mp
                    //value: number;
                    value: -12345.67
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: new Date("2022-01-12 00:00:00+08:00"),

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: "2022-01-11T16:00:00.000Z",

                other: undefined
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(rtn.rtn.detail instanceof MyClassDetail, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 1", () => {
            let p = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: undefined,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let pAssert = {
                //@mp
                //id: string;
                id: "123",

                //@mp
                //val: string;
                val: "456789",

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                //orderid: undefined,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: "true",
                
                    //@mp
                    //value: number;
                    value: -12345.67
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: new Date("2022-01-12 00:00:00+08:00"),

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: "2022-01-11T16:00:00.000Z"
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(rtn.rtn.detail instanceof MyClassDetail, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });
    });

    describe("Error", function () {
        it("case 0", () => {
            let p = {
                detail: {
                    value: "p123"
                }
            };

            let pAssert = {
                detail: {
                    value: null
                }
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, false);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(rtn.rtn.detail instanceof MyClassDetail, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));

            assert.strictEqual(rtn.errors.length, 1);
        });

        it("case 1", () => {
            let p = {
                detail: null,
                other: "Sfs",
                id: undefined
            };

            let pAssert = {
                detail: null
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(Object.keys(rtn.rtn).length, 1);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
            assert.strictEqual(rtn.errors.length, 0);
        });
        
    });
});


describe("Option - KeepOrigin", function () {

    const mapper = new MetaMapper({
        keepOriginVal: true
    });

    describe("Paging", function () {
        it("case 0", () => {
            let p: Paging = {
                offset: 0,
                limit: 100,
                date: null
            };

            let rtn = mapper.map(Paging, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(Object.keys(rtn).length, 3);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn === p, false);
            assert.strictEqual(rtn.rtn instanceof Paging, true);
            assert.strictEqual(JSON.stringify(p), JSON.stringify(rtn.rtn));
        });

        it("case 1", () => {
            let date = new Date();

            let p = {
                offset: "-1",
                limit: "100",
                date: date.getTime(),
                ookk: null
            };

            let pAssert = {
                offset: "-1",
                limit: "100",
                date: date.getTime()
            };

            let rtn = mapper.map(Paging, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(Object.keys(rtn).length, 3);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof Paging, true);
            assert.strictEqual(JSON.stringify(pAssert), JSON.stringify(rtn.rtn));
        });

    });

    describe("MyClass", function () {
        it("case 0", () => {
            let p = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: null,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let pAssert = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: null,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });

        it("case 1", () => {
            let p = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: undefined,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let pAssert = {
                //@mp
                //id: string;
                id: 123,

                //@mp
                //val: string;
                val: 456789,

                //@mp
                //theid: string;
                theid: "shadow",

                //@mp
                //orderid: string;
                orderid: undefined,

                //@mp
                //detail: MyClassDetail;
                detail: {
                    //@mp("cls-name", String)
                    //name: string;
                    name: true,
                
                    //@mp
                    //value: number;
                    value: "-12345.67",

                    testValue: "test-none"
                },

                //@mp("", Enum, () => MyStatusEnum)
                //status: MyStatusEnum;
                status: MyStatusEnum.Complete,

                //@mp("create_date", Date)
                //createDate: Date;
                createDate: "2022-01-12 00:00:00+08:00",

                //@mp("update_date", String)
                //updateDate: Date;
                updateDate: "2022-01-12 00:00:00+08:00",

                //@mp("date_str", String)
                //date: Date;
                date: new Date("2022-01-12 00:00:00+08:00"),
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            //assert.strictEqual(rtn.rtn.detail instanceof MyClassDetail, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
        });
    });

    describe("Error", function () {
        it("case 0", () => {
            let p = {
                detail: {
                    value: "p123",
                    ade: 111
                }
            };

            let pAssert = {
                detail: {
                    value: "p123",
                    ade: 111
                }
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            //assert.strictEqual(rtn.rtn.detail instanceof MyClassDetail, true);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));

            assert.strictEqual(rtn.errors.length, 0);
        });

        it("case 1", () => {
            let p = {
                detail: null,
                other: "Sfs",
                id: undefined
            };

            let pAssert = {
                detail: null
            };

            let rtn = mapper.map(MyClass, p);

            assert.strictEqual(ObjectUtil.isNullOrUndefined(rtn), false);
            assert.strictEqual(rtn.mapped, true);
            assert.strictEqual(rtn.rtn instanceof MyClass, true);
            assert.strictEqual(Object.keys(rtn.rtn).length, 1);
            assert.strictEqual(JSON.stringify(rtn.rtn), JSON.stringify(pAssert));
            assert.strictEqual(rtn.errors.length, 0);
        });
        
    });
});