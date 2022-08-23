import { GenericNameType } from "../../define";
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

    private findMatchedGenericType(genericMetaName: string, genericTypes: GenericNameType[]): GenericNameType {

        let shortenName = null;
        if (genericMetaName.indexOf("$") > 0) {
            shortenName = genericMetaName.replace(/\$\[\d+\]/g, "$");
        }

        let rtn = genericTypes.find(m => (m.name === genericMetaName || m.name === shortenName));
        return rtn;
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {

        if (!wrapper.genericTypes) {
            throw new MetaDefineException("GenericMapper", "No generice types defined for a <Generic> usage.");
        }

        let genericMetaName = wrapper.getMetaName();
        let genericType = this.findMatchedGenericType(genericMetaName, wrapper.genericTypes);

        if (!genericType) {
            throw new MetaDefineException("GenericMapper", `Can't find generic type for: ${genericMetaName}`);
        }

        return wrapper.mapper.mapWithGenericType(genericType.type, obj);
    }
}