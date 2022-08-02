import { MetaDefineException } from "../../exception";
import { MetaBase, MetaArray } from "../../meta/_model";
import { ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../_model";
import { IMetaTypeMapper, MapperRtn } from "./itypeMapper";

export class ArrayMapper implements IMetaTypeMapper {

    match(meta: MetaBase): boolean {
        return meta.inspectType === Array;
    }

    map(wrapper: MetaMapperWrapper, meta: MetaBase, obj: any): MapperRtn<any> {
        if (ObjectUtil.isNullOrUndefined(obj)) {
            return {
                mapped: true,
                rtn: obj
            };
        }

        if (!(obj instanceof Array)) {
            //error: not a array
            return {
                mapped: false,
                rtn: obj
            };
        }

        let innerType = meta.metaTypes[1];
        if (!innerType) {
            throw new MetaDefineException("ArrayMapper", `Array - internal type not defined: ${meta.key}`);
        }
        let innerMetaTypes = meta.metaTypes.slice(1);

        let rtn = new Array<any>();

        obj.forEach((m, idx) => {
            let md = new MetaArray();
            md.idx = idx;
            md.rawType = null;
            md.metaTypes = innerMetaTypes;
            md.key = "$array";
            md.name = "$array";
            
            let itemRtn = wrapper.mapper.map<any>(md, m);
            if (itemRtn.mapped) {
                rtn.push(itemRtn.rtn);
            } else {
                //TODO here:
                //error process (exception) here.

                //NOTE:
                if (wrapper.opt.keepArrayLengthMatch) {
                    rtn.push(null);
                }
            }
        });

        return {
            mapped: true,
            rtn: rtn
        };
    }
}