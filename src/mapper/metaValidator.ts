import { MetaProperty } from "../meta/_model";
import { ValidateUtil } from "../util";
import { MetaMapperWrapper } from "./metaMapperWrapper";
import { MapperError, MapperRtn } from "./model";

export class MetaValidator {
    validate(wrapper: MetaMapperWrapper, propMeta: MetaProperty, propVal: any): Array<MapperError> {
        let validate = wrapper.opt.validate && (propMeta.validators.length > 0);
        if (!validate) { return null; }
        
        if ((propVal === null && !wrapper.opt.validateNull) ||
            (propVal === undefined && !wrapper.opt.validateUndefined)) {
            return null;
        }

        //call every validation function
        let rtn: Array<MapperError> = [];
        propMeta.validators.forEach(m => {
            let params = [propVal, ...m.params];
            let paramStr = params.join(", ");

            let validateRtn: MapperRtn<any> = {
                mapped: true,
                rtn: null
            };

            ValidateUtil.validate(validateRtn,
                m.errCode || "Validation",
                m.errMsg || `${m.validateFunc.name}(${paramStr})`,
                () => {
                    return m.validateFunc.apply(null, params);
                }
            );

            if (!validateRtn.mapped) {
                validateRtn.error.name = wrapper.getStackName();
                rtn.push(validateRtn.error);
            }
        });

        return rtn;
    }
}