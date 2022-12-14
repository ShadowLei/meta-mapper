import { MetaBase } from "../../meta/_model";
import { NumberUtil } from "../../util";
import { MapperRtn } from "../model";
import { IMetaTypeMapper, ITypeMapper, TypeString } from "./iTypeMapper";
import { MapperBase } from "./mapperBase";

class BooleanMapper_FromString implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "string");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let str = (obj as string)?.toLocaleLowerCase();
        let rtn = (str === "true" || str === "1" || str === "ok" || str === "success");

        return {
            mapped: true,
            rtn: rtn
        };
    }
}

class BooleanMapper_FromNumber implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "number");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        if (!NumberUtil.validate(obj)) {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "BooleanMapper",
                    reason: `Can't map from number: ${obj}`
                }
            };
        }

        return {
            mapped: true,
            rtn: (obj as number) > 0
        };
    }
}

class BooleanMapper_FromBoolean implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "boolean");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        return {
            mapped: true,
            rtn: obj
        };
    }
}

export class BooleanMapper extends MapperBase implements IMetaTypeMapper {
    constructor() {
        super();
        
        this.mappers.push(new BooleanMapper_FromString());
        this.mappers.push(new BooleanMapper_FromNumber());
        this.mappers.push(new BooleanMapper_FromBoolean());
        //this.mappers.push(new BooleanMapper_FromDate());
    }

    match(meta: MetaBase): boolean {
        return (meta.inspectType === Boolean);
    }
}