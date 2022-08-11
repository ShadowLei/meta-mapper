
import 'reflect-metadata';
import { ClassConstructor } from '../define';
import { MetaDefineException } from '../exception';
import { MetaUtil, ObjectUtil } from '../util';

//avoid define MC on a property
function verifyMC(target: any, cls: ClassConstructor, name?: string): void {
    if (!cls) {
        throw new MetaDefineException("MetaClass", `mc: ${target} - [${name}]: ClassConstructor is NULL, please verify.`);
    }
}

export function mc(target: Function): void;
export function mc(name: string, type?: ClassConstructor): Function;
export function mc(nameOrTarget: any, type?: ClassConstructor): void | Function {
    if (typeof nameOrTarget === "string" || ObjectUtil.isNullOrUndefined(nameOrTarget)) {
        //Wrapper Format
        return function (target: Function) {
            let cls = target.prototype?.constructor as ClassConstructor;
            verifyMC(target, cls, nameOrTarget);

            let types = type ? [type] : null;
            let meta = MetaUtil.defineMC(cls, nameOrTarget, types);

            Reflect.metadata(cls, meta);
        };
    } else {
        //Raw Format
        let target = nameOrTarget as Function;
        let cls = target.prototype?.constructor as ClassConstructor;
        verifyMC(target, cls, target.name);

        let meta = MetaUtil.defineMC(cls);

        Reflect.metadata(cls, meta);
        return;
    }
}
