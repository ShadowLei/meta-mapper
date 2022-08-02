import { ClassConstructor } from "../../define";
import { MetaMapException } from "../../exception/metaMapException";
import { MetaArray, MetaBase, MetaClass, MetaProperty } from "../../meta/_model";
import { MetaUtil, NumberUtil, ObjectUtil } from "../../util";
import { MetaMapOn, MetaMapperWrapper } from "../_model";
import { IMetaTypeMapper, ITypeMapper, MapperRtn, TypeString } from "./itypeMapper";

export class ObjectMapper implements IMetaTypeMapper {

    match(meta: MetaBase): boolean {
        //NOTE: it's the default analysis
        return true;
    }

    private getProp(obj: any, prop: MetaProperty, on: MetaMapOn): {
        key: string;
        val: any;
    } {
        if (on === MetaMapOn.Key) {
            return {
                key: prop.key,
                val: obj[prop.key]
            };
        } else {
            return {
                key: prop.name,
                val: obj[prop.name]
            };
        }
    }

    //
    private setProp(obj: any, val: any, prop: MetaProperty, on: MetaMapOn): void {
        if (on === MetaMapOn.Key) {
            obj[prop.key] = val;
        } else {
            obj[prop.name] = val;
        }
    }

    private mapProperty<T>(wrapper: MetaMapperWrapper, propMeta: MetaProperty, rtn: T, origin: any): void {
        //get from origin
        let propKeyVal = this.getProp(origin, propMeta, wrapper.opt.from);

        let prop = wrapper.mapper.map(propMeta, propKeyVal.val);

        //set to target
        if (prop.mapped) {
            if ((prop.rtn === undefined && wrapper.opt.ignoreUndefined) ||
                (prop.rtn === null && wrapper.opt.ignoreNull)) {
                //ignore
            } else {
                this.setProp(rtn, prop.rtn, propMeta, wrapper.opt.to);
            }
        }
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
        if (ObjectUtil.isNullOrUndefined(obj)) {
            return {
                mapped: true,
                rtn: obj
            };
        }

        let rtn: any = null;

        if (meta instanceof MetaClass) {
            rtn = new meta.inspectType();

            //Base-Type Properties
            for (let i = meta.metaTypes.length - 1; i >= 0; i--) {
                let baseType = meta.metaTypes[i];
                let baseTypeMC = MetaUtil.getMC(baseType as ClassConstructor);
                baseTypeMC.properties.forEach(p => {
                    this.mapProperty(wrapper, p, rtn, obj);
                });
            }

            //Current-Type Properties
            meta.properties.forEach(p => {
                this.mapProperty(wrapper, p, rtn, obj);
            });

            //TODO here: validator

            return {
                mapped: true,
                rtn: rtn
            };
        }
        else if (meta instanceof MetaProperty) {
            //the inspectType here must be a class, as the Enum | Func etc. was processed previously.
            //lead the inspectType as the real type & convert from it.
            let mapRtn = wrapper.mapper.map(meta.inspectType, obj);
            return mapRtn;
        }
        else if (meta instanceof MetaArray) {
            let mapRtn = wrapper.mapper.map(meta.inspectType, obj);
            return mapRtn;
        }

        throw new MetaMapException("ObjectMapper", "Unexpected map flow here.");
    }
}