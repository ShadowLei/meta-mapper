import { ObjectUtil } from "./objectUtil";

export namespace NumberUtil {

    export function validate(val: number, min?: number, max?: number, allowNull?: boolean): boolean {
        if (allowNull && ObjectUtil.isNullOrUndefined(val)) { return true; }
        if (typeof(val) !== "number") { return false; }

        //if (val === Infinity) { return false; }
        if (isNaN(val)) { return false; }

        if (!ObjectUtil.isNullOrUndefined(min) && val < min) {
            return false;
        }
        if (!ObjectUtil.isNullOrUndefined(max) && val > max) {
            return false;
        }

        return true;
    }
}