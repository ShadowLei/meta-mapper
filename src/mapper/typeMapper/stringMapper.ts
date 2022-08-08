import { MetaClass } from "../../meta/_model";
import { NumberUtil } from "../../util";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";
import { MapperBase } from "./mapperBase";

class StringMapper_FromString implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "string");
    }

    map<T>(type: TypeString, obj: any): MapperRtn<T> {
        return {
            mapped: true,
            rtn: obj
        };
    }
}

class StringMapper_FromNumber implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "number");
    }

    map<T>(type: TypeString, obj: any): MapperRtn<T> {
        if (!NumberUtil.validate(obj)) {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "StringMapper",
                    reason: `Can't map from number: ${obj}`
                }
            };
        }

        return {
            mapped: true,
            rtn: (obj as number).toString() as any
        };
    }
}

class StringMapper_FromBoolean implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "boolean");
    }

    map<T>(type: TypeString, obj: any): MapperRtn<T> {
        return {
            mapped: true,
            rtn: (obj as boolean).toString() as any
        };
    }
}

class StringMapper_FromDate implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "date");
    }

    map<T>(type: TypeString, obj: any): MapperRtn<T> {
        return {
            mapped: true,
            rtn: (obj as Date).toISOString() as any
        };
    }
}

export class StringMapper extends MapperBase implements IMetaTypeMapper {
    constructor() {
        super();
        
        this.mappers.push(new StringMapper_FromString());
        this.mappers.push(new StringMapper_FromNumber());
        this.mappers.push(new StringMapper_FromBoolean());
        this.mappers.push(new StringMapper_FromDate());
    }

    match(meta: MetaClass): boolean {
        return (meta.inspectType === String);
    }
}