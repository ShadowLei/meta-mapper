import { MetaBase } from "../../meta/_model";
import { NumberUtil } from "../../util";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";
import { MapperBase } from "./mapperBase";

class DateMapper_FromString implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "string");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let rtn = {
            mapped: true,
            rtn: null
        };

        try {
            rtn.rtn = new Date(Date.parse(obj as string));
        } catch {
            rtn.mapped = false;
        }

        return rtn;
    }
}

class DateMapper_FromNumber implements ITypeMapper {
    match(type: TypeString): boolean {
        return (type === "number");
    }

    map(type: TypeString, obj: any): MapperRtn<any> {
        let rtn = {
            mapped: true,
            rtn: null
        };

        try {
            rtn.rtn = new Date(obj as number);
        } catch {
            rtn.mapped = false;
        }

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