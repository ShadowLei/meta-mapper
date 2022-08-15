import { ObjectUtil } from "./objectUtil";

export namespace NumberUtil {

    export function validate(val: number, min?: number, max?: number, allowNull?: boolean): boolean {
        if (allowNull && ObjectUtil.isNullOrUndefined(val)) { return true; }
        if (typeof(val) !== "number") { return false; }

        //NOTE: we regards Infinity (such as 1/0) is an invalid number.
        if (val === Infinity) { return false; }
        if (isNaN(val)) { return false; }

        if (!ObjectUtil.isNullOrUndefined(min) && (val < min)) {
            return false;
        }
        if (!ObjectUtil.isNullOrUndefined(max) && (val > max)) {
            return false;
        }

        return true;
    }

    export function asDefault(val: number, defaultVal: number): number {
        if (ObjectUtil.isNullOrUndefined(val) || isNaN(val)) { return defaultVal; }
        
        return val;
    }
}