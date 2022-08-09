import { MetaProperty } from "../meta/_model";
import { MetaMapperWrapper } from "./metaMapperWrapper";
import { MapperRtnError } from "./typeMapper/itypeMapper";

export class MetaValidator {
    validate(wrapper: MetaMapperWrapper, propMeta: MetaProperty, propVal: any): Array<MapperRtnError> {
        let validate = wrapper.opt.validate && (propMeta.validators.length > 0);
        if (!validate) { return null; }
        
        if ((propVal === null && !wrapper.opt.validateNull) ||
            (propVal === undefined && !wrapper.opt.validateUndefined)) {
            return null;
        }

        //call every validation function
        let rtn: Array<MapperRtnError> = [];
        propMeta.validators.forEach(m => {
            let exp: any;
            let validRtn = false;
            let params = [propVal, ...m.params];
            try {
                validRtn = m.validateFunc.apply(null, params);
            } catch (e) {
                exp = e;
                validRtn = false;
            }

            if (!validRtn) {
                let paramStr = params.join(", ");
                let err: MapperRtnError = {
                    name: wrapper.getStackName(),
                    code: m.errCode || "Validation",
                    reason: m.errMsg || exp?.message || `${m.validateFunc.name}(${paramStr})`
                };

                rtn.push(err);
            }
        });

        return rtn;
    }
}