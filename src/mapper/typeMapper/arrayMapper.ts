import { MetaDefineException } from "../../exception";
import { MetaBase, MetaArray } from "../../meta/_model";
import { ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { IMetaTypeMapper, MapperRtn } from "./iTypeMapper";

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

        let typeStr = ObjectUtil.getTypeString(obj);
        if (typeStr !== "array") {
            return {
                mapped: false,
                error: {
                    name: null,
                    code: "ArrayMapper",
                    reason: `Object not an array: ${typeof obj} | ${JSON.stringify(obj)}`
                }
            };
        }

        let innerType = meta.metaTypes[1];
        if (!innerType) {
            throw new MetaDefineException("ArrayMapper", `Array - internal type not defined: ${meta.key}`);
        }
        let innerMetaTypes = meta.metaTypes.slice(1);

        let arr = new Array<any>();

        let mapped = true;

        obj.forEach((m, idx) => {
            //Dyanmic Meta - MetaArray
            let md = new MetaArray();
            md.idx = idx;
            md.rawType = null;
            md.metaTypes = innerMetaTypes;
            md.key = `$[${idx}]`;
            md.name = `$[${idx}]`;
            
            let itemRtn = wrapper.mapper.mapWithMeta<any>(md, m);
            if (!itemRtn.mapped) { mapped = false; }
            
            //the item might be an object
            //as for the try-max-match strategy, we'll set it when not null
            if (!ObjectUtil.isNullOrUndefined(itemRtn.rtn)) {
                arr.push(itemRtn.rtn);
            }
            else if (!itemRtn.mapped && wrapper.opt.keepArrayLengthMatch) {
                arr.push(undefined);
            }

            /*
            if (itemRtn.mapped) {
                arr.push(itemRtn.rtn);
            } else {
                //NOTE:
                if (wrapper.opt.keepArrayLengthMatch) {
                    arr.push(undefined);
                }
            }
            */
        });

        return {
            mapped: mapped,
            rtn: arr
        };
    }
}