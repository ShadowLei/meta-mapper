# meta-mapper
Class based type(object) - mapper(shaper) via meta-data (reflect).

## Install
npm install --save meta-mapper

## Use scenario
* Map & sharp the data from request.
    > Example data `{ name: "shadow", val: "456", date: "2022-01-01", others: "..." }` send from client, we'll need to map & sharp it to `{ name: string, val: number, date: Date }`.

* Db access need to convert your define class object to db object.
    > Exmaple a defined object `{ myName: "shadow" }` wanna to map to db object `{ my_name: "shadow" }` & save in Db, or vice versa.

## Feature
* Support basic type `Number` | `String` | `Boolean` | `Object`.
* Support instance type `Enum` | `Any` | `Date` | `Array`.
* Support nest structure.
* Support validation function on property.
* Try map as much as possible, the `errors` indicates mapping issues.

## Limitation
* Generic type not support yet.
* Support class definition instead of object type constraint definition.
* Support enum { ... } instead of declare type = ... | ...
* Do not support cycle structure.
    > If the structure can't use JSON.stringify, then don't use meta-mapper please.
* Do not support custom map function yet.


## Others
* Null/Undefined is allowed & supported by default as "values" instead of "types".
* Less dependency, only depends on "reflect-metadata"


## Mapper Option
Option | Default Value | Description
--- | --- | ---
**from** | `PropertyKey` | map from the property-key field, otherwise set **as** `MetaName` if from the meta-name please.
**to** | `PropertyKey` | map to the property-key field, otherwise set as `MetaName` if to the meta-name please.
**validate** | `true` | global swith: run validation check or not
**validateUndefined** | `false` | global swith: when validate, should we **validate** undefined value or not.
**validateNull** | `true` | global swith: when validate, should we validate null value or not.
**keepArrayLengthMatch** | `true` | when map failed on an array item, should we still set as "undefined" to keep the array length or not.


## Performance
A simple map action would cost 10 ~ 30(us).
A complex map action would cost about 100+(us) depends your data structure.
> refer: $/test/performance.test.ts to check whether it could match your expectation or not please.


## Code Example
> refer: $/test/readme.test.ts as well pleae.

```typescript


//1. define your class w/ meta
//@mc short for Meta-Class
//@mp short for Meta-Property
//@mv short for Meta-Validation
@mc
class PagingData {
    @mp
    code: string;

    //meta-alias is "value" instead of "val"
    //Note here mark the real data-type of the "val" | "value" as "Number" (instead of the define type "String")
    //In later map action, no matter what data-type of the "val" | "value" is, the mapper would try to conver it to "Number" type.
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

    //first parameter is "" or null indicates the meta-name is same as the property name, here it's "data" as well.
    @mp("", Array, PagingData)
    data: PagingData[];
}
```

```typescript
//2. create a meta-mapper (w/ default option)
//Which a meta-mapper instance can be shared among the application, but if you need different mapper option you might init multiple instance.
//Note by default the opt is from PropertyKey -> PropertyKey
//Here we wanna to test the map from propertyKey to MetaName, so we set "opt.to" to "Meta"
const mapper = new MetaMapper({ to: MetaMapOn.Meta });
```

```typescript
//3. indicate the class-type to map the object via calling .map() method.
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
```


```typescript
//4. verify the ouput, here the return "p.rtn" would be like:
let pAssert = {
    offset: 0,
    limit: 20,  //convert from String to Number
    date: new Date("2022-01-01T01:10:00.000Z"),     //convert from String to Date
    data: [
        //nest data convert from "val" to "value", and type from String to Number
        { code: "s-001", value: 1 },
        { code: "s-002", value: 2 }
    ]
};
assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
assert.strictEqual(p.rtn.date instanceof Date, true);
```

## Design

* MetaMapper-Flow:
![MetaMapper-Flow](/design/MetaMapper%402x.png)

* MetaMapper-DataType:
![MetaMapper-DataType](/design/MetaMapper-DataType%402x.png)
