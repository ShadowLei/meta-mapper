import { TypeString } from "../mapper/typeMapper/iTypeMapper";

export namespace ObjectUtil {
    export function isNullOrUndefined(obj: any): boolean {
        return (obj === null || obj === undefined);
    }

    export function isNotNullOrUndefined(obj: any): boolean {
        return !isNullOrUndefined(obj);
    }

    export function getTypeString(obj: any): TypeString {
        if (obj === null) {
            return "null";
        } else if (obj instanceof Date) {
            return "date";
        } else if (obj instanceof Array) {
            return "array";
        } else {
            return typeof (obj);
        }
    }
}
