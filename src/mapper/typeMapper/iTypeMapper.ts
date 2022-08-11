import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { MapperRtn } from "../model";

export interface IMetaTypeMapper {
    match(meta: MetaBase): boolean;
    map<T>(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<T>;
}

export type TypeString = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "date" | "array" | "null";

export interface ITypeMapper {
    match(type: TypeString): boolean;
    map(type: TypeString, obj: any): MapperRtn<any>;
}
