# meta-mapper
Class based type(object) - mapper(shaper) via meta-data (reflect)

## Use scenario
```
1. Format & sharp the input request data from web input.
Example a { name: "shadow", val: "456", date: "2022-01-01" } send from client, we'll need to convert it to { name: string, val: number, date: Date } for usage.
```

```
2. Db access need to convert your define class object to db object.
Exmaple a defined object { myName: "shadow" } wanna to map to db object { my_name: "shadow" } & save in PG.
```

## Features

```
1. Support basic type Number | String | Boolean | Object
2. Support instance type Enum | Any | Array
3. Support nest structure
4. Validation is on-goging
```

## Limitations

```
1. Generic type not support yet
2. Support class definition instead of object type constraint definition
3. Support enum { ... } instead of declare type = ... | ...
4. Do not support cycle structure
    > If the structure can't use JSON.stringify, then don't use meta-mapper please
5. 
```

## Example
```typescript

//refer: $/test/readme.test.ts as well.

//1. define your class w/ meta
//@mc short for Meta-Class
//@mp short for Meta-Property
//@mv short for Meta-Validation
@mc
class PagingData {
    @mp
    code: string;

    //meta-alias is "value" instead of "val"
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
    data: PagingData[]
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
}
assert.strictEqual(JSON.stringify(p.rtn), JSON.stringify(pAssert));
assert.strictEqual(p.rtn.date instanceof Date, true);
```

## Mapper Options
```
```
