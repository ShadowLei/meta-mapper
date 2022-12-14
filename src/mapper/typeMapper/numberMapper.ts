import { MetaBase } from "../../meta/_model";
import { NumberUtil, ValidateUtil } from "../../util";
import { MapperRtn } from "../model";
import { IMetaTypeMapper, ITypeMapper, TypeString } from "./iTypeMapper";
import { MapperBase } from "./mapperBase";

class NumberMapper_FromString implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "string");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let rtn: MapperRtn<any> = {
            mapped: true,
            rtn: null
        };

        ValidateUtil.validate(rtn,
            "NumberMapper",
            `Not a validate number: ${obj}`,
            () => {
                rtn.rtn = parseFloat(obj);
                return NumberUtil.validate(rtn.rtn);
            }
        );

        return rtn;
    }
}

class NumberMapper_FromNumber implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "number");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        if (!NumberUtil.validate(obj)) {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "NumberMapper",
                    reason: `Can't map from number: ${obj}`
                }
            };
        }

        return {
            mapped: true,
            rtn: obj
        };
    }
}

class NumberMapper_FromBoolean implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "boolean");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        return {
            mapped: true,
            rtn: ((obj === true) ? 1 : 0)
        };
    }
}

class NumberMapper_FromDate implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "date");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        return {
            mapped: true,
            rtn: (obj as Date).getTime()
        };
    }
}

export class NumberMapper extends MapperBase implements IMetaTypeMapper {
    constructor() {
        super();
        
        this.mappers.push(new NumberMapper_FromString());
        this.mappers.push(new NumberMapper_FromNumber());
        this.mappers.push(new NumberMapper_FromBoolean());
        this.mappers.push(new NumberMapper_FromDate());
    }

    match(meta: MetaBase): boolean {
        return (meta.inspectType === Number);
    }
}