import { ClassConstructor } from "../define";
import { BooleanUtil, DateUtil, MetaUtil, NumberUtil, ObjectUtil, StringUtil } from "../util";
import { MetaPropertyValidator, ValidateFuncType } from "./_model";

function createMPV(cls: ClassConstructor, propertyKey: string, validateFunc: ValidateFuncType, params: Array<any>, errCode?: string, errMsg?: string) {
    let prop = MetaUtil.tryGetMP(cls, propertyKey);

    let validator = new MetaPropertyValidator();

    validator.validateFunc = validateFunc;
    validator.params = params || [];
    validator.errCode = errCode;
    validator.errMsg = errMsg;

    prop.validators.push(validator);
}

export function mv_string(minLen: number, maxLen: number, allowNull?: boolean, errCode?: string, errMsg?: string) {
    return function (target: any, propertyKey: string) {
        let cls = target.constructor as ClassConstructor;
        createMPV(cls, propertyKey, StringUtil.validate, [minLen, maxLen, allowNull], errCode, errMsg);
    };
}

export function mv_boolean(allowNull?: boolean, errCode?: string, errMsg?: string) {
    return function (target: any, propertyKey: string) {
        let cls = target.constructor as ClassConstructor;
        createMPV(cls, propertyKey, BooleanUtil.validate, [allowNull], errCode, errMsg);
    };
}

export function mv_date(min?: Date, max?: Date, allowNull?: boolean, errCode?: string, errMsg?: string) {
    return function (target: any, propertyKey: string) {
        let cls = target.constructor as ClassConstructor;
        createMPV(cls, propertyKey, DateUtil.validate, [min, max, allowNull], errCode, errMsg);
    };
}

export function mv_number(min: number, max: number, allowNull?: boolean, errCode?: string, errMsg?: string) {
    return function (target: any, propertyKey: string) {
        let cls = target.constructor as ClassConstructor;
        createMPV(cls, propertyKey, NumberUtil.validate, [min, max, allowNull], errCode, errMsg);
    };
}

export function mv_not_null_or_undefined(target: any, propertyKey: string);
export function mv_not_null_or_undefined(errCode?: string, errMsg?: string): Function;
export function mv_not_null_or_undefined(wTarget: any, wPropertyKey?: string) {
    if (typeof wTarget === "string" || ObjectUtil.isNullOrUndefined(wTarget)) {
        //Wrapper Format
        
        return function (target: any, propertyKey: string) {
            let cls = target.constructor as ClassConstructor;
            createMPV(cls, propertyKey, ObjectUtil.isNotNullOrUndefined, [], wTarget, wPropertyKey);
        };
    } else {
        //Raw Format
        let cls = wTarget.constructor as ClassConstructor;
        createMPV(cls, wPropertyKey, ObjectUtil.isNotNullOrUndefined, []);

        return;
    }
}

export function mv_custom(func: ValidateFuncType, params?: any[], errCode?: string, errMsg?: string) {
    return function (target: any, propertyKey: string) {
        let cls = target.constructor as ClassConstructor;
        createMPV(cls, propertyKey, func, params, errCode, errMsg);
    };
}
