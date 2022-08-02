import { ClassConstructor } from "../define";
import { tryGetDefaultMC } from "../meta/_meta";
import { MetaClass, MetaProperty } from "../meta/_model";

export namespace MetaUtil {

    export function getMC(cls: ClassConstructor): MetaClass {

        let mcDefault = tryGetDefaultMC(cls);
        if (mcDefault) { return mcDefault; }

        let meta: MetaClass = Reflect.getMetadata(cls, cls);
        return meta;
    }

    export function getMPByKey(metaCls: MetaClass, key: string): MetaProperty {
        let rtn = metaCls.properties.find(m => m.key === key);
        return rtn;
    }

    export function getMPByName(metaCls: MetaClass, name: string): MetaProperty {
        let rtn = metaCls.properties.find(m => m.name === name);
        return rtn;
    }

    export function defineMC(cls: ClassConstructor, name?: string, types?: ClassConstructor[]): MetaClass {
        let rtn = getMC(cls);

        if (!rtn) {
            rtn = new MetaClass();
            rtn.key = cls.name;
            rtn.name = rtn.key;
            rtn.rawType = cls;
        }

        if (name) {
            rtn.name = name || cls.name;
        }
        if (types) {
            rtn.metaTypes = types;
        }

        Reflect.defineMetadata(cls, rtn, cls);

        return rtn;
    }

    export function tryGetMC(cls: ClassConstructor): MetaClass {
        let rtn = getMC(cls);
        if (rtn) { return rtn; }

        rtn = defineMC(cls);
        return rtn;
    }

    export function defineMP(cls: ClassConstructor, key: string, name?: string, originType?: Function, types?: Function[]): MetaProperty {
        let metaCls = tryGetMC(cls);
        let rtn = getMPByKey(metaCls, key);

        if (!rtn) {
            rtn = new MetaProperty();
            rtn.key = key;
            rtn.name = rtn.name || key;
            rtn.rawType = null;
            metaCls.properties.push(rtn);
        }

        if (name) {
            rtn.name = name || key;
        }
        if (originType) {
            rtn.rawType = originType as ClassConstructor;
        }
        if (types) {
            rtn.metaTypes = types;
        }

        return rtn;
    }

    export function tryGetMP(cls: ClassConstructor, key: string): MetaProperty {
        return defineMP(cls, key);
    }
}