# meta-mapper
Class based type(object) - mapper(shaper) via meta-data (reflect).

## Install
npm install --save meta-mapper

## Use scenario
* Map & sharp the data from request.
    > Example: data `{ name: "shadow", val: "456", date: "2022-01-01", others: "..." }` send from client, we'll need to map & sharp it to `{ name: string, val: number, date: Date }`.

* Db access need to convert your define class object to db object.
    > Example: a defined object `{ myName: "shadow" }` wanna to map to db object `{ my_name: "shadow" }` & save in Db, or vice versa.

## Feature
* Support basic type `Number` | `String` | `Boolean` | `Object`.
* Support instance type `Enum` | `Any` | `Date` | `Array`.
* Support nest structure.
* Support super class.
* Support validation function on property.
* Use stragety `try map as much as possible`, the `errors` indicates the runtime mapping issues.
* Support generic type w/ `Generic` class/keyword since v0.2.0
    > Use a `name` (the meta-name) to represent the type wannt, example `paging.offset.date`, for array structure try to use example `paging.data.$` please.  
    > Check more details in test case in `generic.test.ts` please.

## Limitation
* Support class definition instead of object type constraint definition.
* Support enum { ... } instead of declare type = ... | ...
* Do not support cycle structure.
    > If the structure can't use JSON.stringify, then don't use meta-mapper please.
* Do not support custom map function yet.

## Exception & Error
* Most of the `Exception` was thrown for the definiation error, which means you might correct it on the program phase instead of runtime phase.
* `Error` returned from `$rtn.errors` which represent the map runtime error. It's an array structure since we use `try map as much as possible` stragety.
    > `$rtn.errors[$idx].name` is the meta name by default, example `paging.offset`. When there's array structure it could be like `paging.detail.data[2].value` etc.

## Performance
Below performance test based on: 2.4 GHz 8-Core Intel Core i9 + 64G Memory.
* A simple class structure - map action would cost 10 ~ 30(us).
* A complex class structure - map action would cost about 100+(us) depends your data structure.
> ref: check $/test/performance.test.ts for more details please.

## Others
* Null/Undefined is allowed & supported by default as "values" instead of "types".
* Less dependency, only depends on "reflect-metadata"

## API
* `@mc(name: string, types: ClassConstructor[], genericTypes?: Array<GenericNameType>)`
    > when define a class, attach `@mc` on the class as a meta class data.  
    > Example: `@mc("my_class", ClassBase)` for class `class MyClass extends ClassBase`.
    - name: meta-name (alias) of your class. By default `null` | `""` indicates the same as the class-name. 
    - type: super types of the class.
    - genericTypes: If any generic type, indicate it here please. for `Array<T>` indicate the name as `$` (i.e. `xx.$.xxx`) please.
* `@mp(name: string, types: ClassConstructor[] | Function[])`
    > when define a property, attach `@mp` on the property as a meta property data.
    - name: meta-name (alias) of your property. By default `null` | `""` indicates the same as thhe property-name.
    - types: internal nest types of the property.
        * `Any`: means should ignore the map action on this property, keep as it is.
        * `Array`: when it's an array, need to define as `Array`, and the internal element type of the `Array`.
            > Example: `@mp("custom_array", Array, MyCustomClass)` for property `custom_array: MyCustomClass[]`.
        * `Enum`: when it's an enum defined w/ `enum XXX {...}`, need to set as `Enum` and the real enum object type.
            > Example: `@mp("my_enum", Enum, () => MyEnum)` for property `my_enum: MyEnum`.
* `@mv_???`
    > Validation function. Use mv_custom to define customized validation function please.
* `new(opt: MetaMapperOption)`
    > Define your mapper w/ custom mapper options.
    - opt: check the option below please.
* `map(type: ClassConstructorGeneric<T>, obj: any): MapperRtn<T>`
    > map from any object input to defined class data type.  
    > Example: `@mp("my_enum", Enum, () => MyEnum)` for property `my_enum: MyEnum`.
    - type: the class type you wanna to map to.
    - obj: the object you wanna to map from.

## Mapper Option
Option | Default Value | Description
--- | --- | ---
**from** | `PropertyKey` | map from the property-key field, otherwise set **as** `MetaName` if from the meta-name please.
**to** | `PropertyKey` | map to the property-key field, otherwise set as `MetaName` if to the meta-name please.
**validate** | `true` | global swith: run validation check or not
**validateUndefined** | `false` | global swith: when validate, should we **validate** undefined value or not.
**validateNull** | `true` | global swith: when validate, should we validate null value or not.
**keepArrayLengthMatch** | `true` | when map failed on an array item, should we still set as "undefined" to keep the array length or not.


## Code Example
> ref: $/test/readme.test.ts as well pleae.

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
![MetaMapper-Flow](/design/MetaMapper.png)

* MetaMapper-DataType:
![MetaMapper-DataType](/design/MetaMapper-DataType.png)
