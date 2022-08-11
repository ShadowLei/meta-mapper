import { ValidateFunc } from "../define";
import { MapperRtn } from "../mapper";

export namespace ValidateUtil {
    export function validate(rtn: MapperRtn<any>, errCode: string, errMsg: string, func: ValidateFunc): void {
        let exp = null;
        try {
            rtn.mapped = func(rtn);
        } catch (e) {
            exp = e;
            rtn.mapped = false;
        }

        if (!rtn.mapped) {
            rtn.rtn = null;
            rtn.error = {
                name: null,
                code: errCode || "Validation",
                reason: errMsg || exp?.message || "Validate Error"
            };
        }
    }
}