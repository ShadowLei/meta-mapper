
import { ObjectUtil } from "./objectUtil";

export namespace EnumUtil {

    function isValueMatch(enumObj: any, val: any): boolean {
        if (!ObjectUtil.isNullOrUndefined(enumObj[val]) &&
            (typeof enumObj[val] === "number")) {
            return true;
        }

        return false;
    }

    export function tryMatch(enumObj: any, obj: any): {
        match: boolean
        val: any
    } {
        let rtn = {
            match: true,
            val: null
        };

        //try value match
        for (let key in enumObj) {
            let val = enumObj[key];
            //not match
            if (obj !== val) { continue; }

            //match: fully
            if (key === val) {
                rtn.val = val;
                return rtn;
            }
            //match: Numbers
            else if (typeof val === "number") {
                rtn.val = val;
                return rtn;
            }
            //w/ key - value - paire
            else if (isValueMatch(enumObj, val)) {
                rtn.val = enumObj[val];
                return rtn;
            }
            //w/o key - value - pair
            else if (ObjectUtil.isNullOrUndefined(enumObj[val])) {
                rtn.val = val;
                return rtn;
            }
        }

        //try key match
        for (let key in enumObj) {
            if (obj !== key) { continue; }
            let val = enumObj[key];

            if (isValueMatch(enumObj, val)) {
                rtn.val = enumObj[val];
                return rtn;
            }

            rtn.val = enumObj[key];
            return rtn;
        }

        rtn.match = false;
        return rtn;
    }
}