import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { Any } from "../_model";
import { IMetaTypeMapper, MapperRtn } from "./iTypeMapper";

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