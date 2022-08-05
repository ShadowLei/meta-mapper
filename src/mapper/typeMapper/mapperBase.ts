import { MetaBase } from "../../meta/_model";
import { ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";


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
                return m.map(typeStr, obj);
            }
        }

        //TODO here: exception | error process
        return {
            mapped: false,
            rtn: null,
            error: {
                name: wrapper.getStackName(),
                code: "Mismatch",
                reason: `Mapper: Unable to find proper match for type: ${typeStr}`
            }
        };
    }
}