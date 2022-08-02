import { MetaBase } from "../../meta/_model";
import { Any, MetaMapOn, MetaMapperWrapper } from "../_model";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";

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