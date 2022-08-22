import { MapperRtn } from "./mapper";

export interface ClassConstructorGeneric<T> extends Function {
    new(): T;
}

export interface ClassConstructor extends ClassConstructorGeneric<any> {
}

export type ValidateFunc = (rtn: MapperRtn<any>) => boolean;

export class GenericNameType {
    name: string;
    type: ClassConstructor;
}
