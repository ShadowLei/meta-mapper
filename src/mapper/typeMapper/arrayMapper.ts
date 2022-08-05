import { MetaDefineException } from "../../exception";
import { MetaBase, MetaArray } from "../../meta/_model";
import { ObjectUtil } from "../../util";
import { MetaMapperWrapper } from "../metaMapperWrapper";
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

        let typeStr = ObjectUtil.getTypeString(obj);
        if (typeStr !== "array") {
            return {
                mapped: false,
                rtn: null,
                error: {
                    name: wrapper.getStackName(),
                    code: "NotArray",
                    reason: `ArrayMapper: Object not an array: ${typeof obj} | ${JSON.stringify(obj)}`
                }
            };
        }

        let innerType = meta.metaTypes[1];
        if (!innerType) {
            throw new MetaDefineException("ArrayMapper", `Array - internal type not defined: ${meta.key}`);
        }
        let innerMetaTypes = meta.metaTypes.slice(1);

        let arr = new Array<any>();

        obj.forEach((m, idx) => {
            //Dyanmic Meta - MetaArray
            let md = new MetaArray();
            md.idx = idx;
            md.rawType = null;
            md.metaTypes = innerMetaTypes;
            md.key = `$[${idx}]`;
            md.name = `$[${idx}]`;
            
            let itemRtn = wrapper.mapper.mapWith<any>(md, m);
            
            if (itemRtn.mapped) {
                arr.push(itemRtn.rtn);
            } else {
                //NOTE:
                if (wrapper.opt.keepArrayLengthMatch) {
                    arr.push(undefined);
                }
            }
        });

        return {
            mapped: true,
            rtn: arr
        };
    }
}