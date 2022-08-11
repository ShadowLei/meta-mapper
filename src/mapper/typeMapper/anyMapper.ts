import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { Any, MapperRtn } from "../model";
import { IMetaTypeMapper } from "./iTypeMapper";

export class AnyMapper implements IMetaTypeMapper {

    match(meta: MetaBase): boolean {
        return meta.inspectType === Any;
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
        return {
            mapped: true,
            rtn: obj
        };
    }
}