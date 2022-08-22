import { MetaDefineException, MetaMapException } from "../../exception";
import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { Any, Generic, MapperRtn } from "../model";
import { mapperFac } from "../_const";
import { IMetaTypeMapper } from "./iTypeMapper";

export class GenericMapper implements IMetaTypeMapper {

    match(meta: MetaBase): boolean {
        return meta.inspectType === Generic;
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {

        if (!wrapper.genericTypes) {
            throw new MetaDefineException("GenericMapper", "No generice types defined for a <Generic> usage.");
        }

        let genericMetaName = wrapper.getMetaName();
        let genericType = wrapper.genericTypes.find(m => {
            if (m.name === genericMetaName) {
                return true;
            }
            return false;
        });

        if (!genericType) {
            throw new MetaMapException("GenericMapper", `Can't find generic type for: ${genericMetaName}`);
        }

        return wrapper.mapper.mapWithGenericType(genericType.type, obj);
    }
}