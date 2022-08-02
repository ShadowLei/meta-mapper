import { ObjectUtil } from "./objectUtil";

export namespace BooleanUtil {

    export function validate(val: boolean, allowNull: boolean = false): boolean {
        if (allowNull && ObjectUtil.isNullOrUndefined(val)) { return true; }

        if (typeof (val) !== "boolean") { return false; }

        return true;
    }

    export function asDefault(val: boolean, defaultVal: boolean): boolean {
        if (val === true || val === false) { return val; }
        return defaultVal;
    }
}
