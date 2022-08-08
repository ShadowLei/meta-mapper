import { MetaDefineException } from "../../exception";
import { MetaBase } from "../../meta/_model";
import { EnumUtil, NumberUtil, ObjectUtil, StringUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { Enum } from "../_model";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";

export class EnumMapper implements IMetaTypeMapper {
    match(meta: MetaBase): boolean {
        return (meta.inspectType === Enum);
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
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

        let typeStr = ObjectUtil.getTypeString(obj);
        if (typeStr !== "string" && typeStr !== "number") {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "EnumMapper",
                    reason: `Value must be string | number: ${typeof obj} | ${JSON.stringify(obj)}`
                }
            };
        }

        if (typeStr === "number" && !NumberUtil.validate(obj)) {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "EnumMapper",
                    reason: `Can't map from number: ${obj}`
                }
            };
        };

        let match = EnumUtil.tryMatch(enumObj, obj);
        if (match.match) {
            return {
                mapped: true,
                rtn: match.val
            };
        }
        
        return {
            mapped: false,
            error: {
                name: null,
                code: "EnumMapper",
                reason: `Value not a valid enum: ${JSON.stringify(obj)}`
            }
        };
    }
}