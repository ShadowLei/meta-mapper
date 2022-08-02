import { ObjectUtil } from "./objectUtil";

export namespace StringUtil {

    export function validate(val: string, minLen: number, maxLen: number, allowNull: boolean = false): boolean {
        if (allowNull && ObjectUtil.isNullOrUndefined(val)) { return true; }
        if (typeof(val) !== "string") { return false; }
        
        if (val.length < minLen || val.length > maxLen) { return false; }

        return true;
    }
}