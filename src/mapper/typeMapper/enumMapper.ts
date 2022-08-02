import { MetaDefineException } from "../../exception";
import { MetaBase } from "../../meta/_model";
import { EnumUtil, NumberUtil, ObjectUtil, StringUtil } from "../../util";
import { Enum, MetaMapperWrapper } from "../_model";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";

export class EnumMapper implements IMetaTypeMapper {
    match(meta: MetaBase): boolean {
        return (meta.inspectType === Enum);
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
        let rtn = {
            mapped: true,
            rtn: null
        };

        let enumType = meta.metaTypes[1];
        if (!enumType) {
            throw new MetaDefineException("EnumMapper", `Enum type not defined: ${meta.key}`);
        }
        if (typeof enumType !== "function") {
            throw new MetaDefineException("EnumMapper", `Enum internal type mut be a function: ${meta.key}`);
        }

        let enumObj = enumType();
        if (!enumObj) {
            throw new MetaDefineException("EnumMapper", `Enum internal type returns null`);
        }

        let match = EnumUtil.tryMatch(enumObj, obj);
        if (match.match) {
            rtn.rtn = match.val;
            return rtn;
        }
        
        rtn.mapped = false;
        return rtn;
    }
}