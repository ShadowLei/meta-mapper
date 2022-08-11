import { MapperError } from "./metaError";


export interface MapperRtn<T> {
    mapped: boolean;
    rtn?: T;

    error?: MapperError;
    errors?: MapperError[];
}
