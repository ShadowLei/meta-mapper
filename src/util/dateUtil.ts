import { ObjectUtil } from "./objectUtil";

export namespace DateUtil {

    export function validate(val: Date, min: Date = null, max: Date = null, allowNull: boolean = false): boolean {
        if (allowNull && ObjectUtil.isNullOrUndefined(val)) { return true; }
        if (!(val instanceof Date)) { return false; }
        
        let dateNum: number = null;
        try {
            dateNum = Date.parse(val.toISOString());
        } catch { }

        if (!dateNum || dateNum < 0) { return false; }
        
        val = new Date(dateNum);
        if (min && val < min) { return false; }
        if (max && val > max) { return false; }

        return true;
    }
}