import { MetaBase } from "../../meta/_model";
import { DateUtil, NumberUtil, ValidateUtil } from "../../util";
import { MapperRtn } from "../model";
import { IMetaTypeMapper, ITypeMapper, TypeString } from "./iTypeMapper";
import { MapperBase } from "./mapperBase";

class DateMapper_FromString implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "string");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let rtn: MapperRtn<any> = {
            mapped: true,
            rtn: null
        };

        ValidateUtil.validate(rtn,
            "DateMapper",
            `Not a validate date: ${obj}`,
            () => {
                rtn.rtn = new Date(Date.parse(obj as string));
                return DateUtil.validate(rtn.rtn);
            }
        );

        /*
        let exp = null;
        try {
            rtn.rtn = new Date(Date.parse(obj as string));
            rtn.mapped = DateUtil.validate(rtn.rtn);
        } catch (e) {
            rtn.mapped = false;
            exp = e;
        }

        if (!rtn.mapped) {
            rtn.rtn = null;
            rtn.error = {
                code: "DateMapper",
                name: null,
                reason: exp?.message || `Not a validate date: ${obj}`
            }
        }
        */

        return rtn;
    }
}

class DateMapper_FromNumber implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "number");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let rtn: MapperRtn<any> = {
            mapped: true,
            rtn: null
        };

        if (!NumberUtil.validate(obj)) {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "DateMapper",
                    reason: `Can't map from number: ${obj}`
                }
            };
        }

        ValidateUtil.validate(rtn,
            "DateMapper",
            `Not a validate date: ${obj}`,
            () => {
                rtn.rtn = new Date(obj as number);
                return DateUtil.validate(rtn.rtn);
            }
        );

        return rtn;
    }
}

class DateMapper_FromDate implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "date");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        return {
            mapped: true,
            rtn: obj
        };
    }
}

export class DateMapper extends MapperBase implements IMetaTypeMapper {
    constructor() {
        super();
        
        this.mappers.push(new DateMapper_FromString());
        this.mappers.push(new DateMapper_FromNumber());
        //this.mappers.push(new DateMapper_FromBoolean());
        this.mappers.push(new DateMapper_FromDate());
    }

    match(meta: MetaBase): boolean {
        return (meta.inspectType === Date);
    }
}