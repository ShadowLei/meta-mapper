import { MetaDefineException } from "../../exception";
import { MetaBase } from "../../meta/_model";
import { EnumUtil, NumberUtil, ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { Enum, MapperRtn } from "../model";
import { IMetaTypeMapper, ITypeMapper, TypeString } from "./iTypeMapper";
import { MapperBase } from "./mapperBase";

export class EnumMapper implements IMetaTypeMapper {

    match(meta: MetaBase): boolean {
        return (meta.inspectType === Enum);
    }

    private getEnumObject(meta: MetaBase): any {
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
    
        return enumObj;
    }

    private mapAsEnumArray(enumArr: Array<any>, obj: any): MapperRtn<any> {
        let found = enumArr.find(m => m === obj);
        if (found) {
            return {
                mapped: true,
                rtn: found
            };
        }
        
        return {
            mapped: false,
            error: {
                name: null,
                code: "EnumMapper",
                reason: `Value not a valid typed array: ${obj}`
            }
        };
    }

    private mapAsEnumObject(enumObj: any, obj: any): MapperRtn<any> {
        let typeStr = ObjectUtil.getTypeString(obj);
        if (typeStr !== "string" && typeStr !== "number") {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "EnumMapper",
                    reason: `Value must be string | number: ${obj}`
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
        }

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
                reason: `Value not a valid enum: ${obj}`
            }
        };
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
        if (ObjectUtil.isNullOrUndefined(obj)) {
            return {
                mapped: true,
                rtn: obj
            };
        }

        let enumObj = this.getEnumObject(meta);
        let enumTypeStr = ObjectUtil.getTypeString(enumObj);

        switch (enumTypeStr) {
            case "array":
                return this.mapAsEnumArray(enumObj, obj);
            case "object":
                return this.mapAsEnumObject(enumObj, obj);
            default:
                break;
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