import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";

export type MapperErrorCode = "BooleanMapper" | "ArrayMapper" | "DateMapper" | "StringMapper" | "NumberMapper" | "ObjectMapper" | "EnumMapper" |
    "Mismatch";

export interface MapperRtnError {
    name: string;
    code: MapperErrorCode;
    reason: string;
}

export interface MapperRtn<T> {
    mapped: boolean;
    rtn?: T;

    error?: MapperRtnError;
    errors?: MapperRtnError[];
}

export interface IMetaTypeMapper {
    match(meta: MetaBase): boolean;
    map<T>(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<T>;
}

export type TypeString = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "date" | "array" | "null";

export interface ITypeMapper {
    match(type: TypeString): boolean;
    map(type: TypeString, obj: any): MapperRtn<any>;
}
