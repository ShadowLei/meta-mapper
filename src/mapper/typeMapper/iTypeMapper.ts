import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../_model";


export interface MapperRtnError {
    key: string;
    name: string;
    code: string;
    reason: string;
}

export interface MapperRtn<T> {
    mapped: boolean;
    rtn: T;

    err?: MapperRtnError;
}

export interface IMetaTypeMapper {
    match(meta: MetaBase): boolean;
    map<T>(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<T>;
}

export type TypeString = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "date" | "array";

export interface ITypeMapper {
    match(type: TypeString): boolean;
    map(type: TypeString, obj: any): MapperRtn<any>;
}
