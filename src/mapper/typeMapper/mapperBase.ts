import { MetaBase } from "../../meta/_model";
import { ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { IMetaTypeMapper, ITypeMapper, MapperErrorCode, MapperRtn, TypeString } from "./iTypeMapper";


export abstract class MapperBase implements IMetaTypeMapper {
    protected mappers: ITypeMapper[];

    constructor() {
        this.mappers = [];
    }

    abstract match(meta: MetaBase): boolean;

    map<T>(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<T> {
        if (ObjectUtil.isNullOrUndefined(obj)) {
            return {
                mapped: true,
                rtn: obj
            };
        }

        //NOTE: here we don't use inspectType,
        //we should use the real - value type when on converting.
        //A. metaType should be the rawType on property if not set.
        //B. actualType should be the convertFrom, and metaType should be the convertTo
        let typeStr = ObjectUtil.getTypeString(obj);

        for (let m of this.mappers) {
            if (m.match(typeStr)) {
                let rtn = m.map(typeStr, obj);

                return rtn;
            }
        }

        return {
            mapped: false,
            error: {
                name: null,
                code: this.constructor.name as MapperErrorCode,
                reason: `Unable to find proper match method for type: ${typeStr}`
            }
        };
    }
}