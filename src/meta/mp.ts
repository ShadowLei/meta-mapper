
import 'reflect-metadata';
import { ClassConstructor } from '../define';
import { MetaDefineException } from '../exception';
import { MetaUtil, ObjectUtil } from '../util';


//avoid define MP on a class or function
function verifyMP(target: any, propertyKey: string, originalType: Function): void {
    if (!propertyKey) {
        throw new MetaDefineException("MetaProperty", `mp: [${target}]: propertyKey is NULL, please verify.`);
    }
    if (!originalType) {
        throw new MetaDefineException("MetaProperty", `mp: [${target}] - [${propertyKey}]: originalType is NULL, please verify.`);
    }
}

export function mp(cls: object, propertyKey: string): void;
export function mp(name: string, ...types: Function[]): Function;
export function mp(wTarget: any, wPropertyKey: string | Function, ...types: Function[]): void | Function {
    if (typeof wTarget === "string" || ObjectUtil.isNullOrUndefined(wTarget)) {
        //Wrapper Format
        return function (clsFunc: any, propertyKey: string) {
            let cls = clsFunc.constructor as ClassConstructor;
            let type = wPropertyKey as Function;
            let originalType = Reflect.getMetadata("design:type", clsFunc, propertyKey);

            let theTypes: Function[] = [];
            if (type) { theTypes.push(type); }
            if (types?.length > 0) { theTypes.push(...types); }

            verifyMP(clsFunc, propertyKey, originalType);

            MetaUtil.defineMP(cls, propertyKey, wTarget, originalType, theTypes);
        };
    } else {
        //Raw Format
        let cls = wTarget.constructor as ClassConstructor;
        let propertyKey = wPropertyKey as string;
        let originalType = Reflect.getMetadata("design:type", wTarget, propertyKey);

        verifyMP(wTarget, propertyKey, originalType);

        MetaUtil.defineMP(cls, propertyKey, null, originalType);

        return;
    }
}