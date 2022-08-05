import { ClassConstructorGeneric } from "../define";
import { MetaUtil } from "../util";
import { MapperRtn } from "./typeMapper/itypeMapper";
import { MetaMapperOption } from "./_model";
import { MetaDefineException } from "../exception";
import { mapperFac } from "./_const";
import { MetaBase } from "../meta/_model";
import { MetaMapperWrapper } from "./metaMapperWrapper";

export class MetaMapper {
    private wrapper: MetaMapperWrapper;

    constructor(opt?: Partial<MetaMapperOption> | MetaMapperWrapper) {
        let option: Partial<MetaMapperOption> = null;
        if (opt) {
            if (opt instanceof MetaMapperWrapper) {
                this.wrapper = opt;
            } else {
                option = opt as Partial<MetaMapperOption>;
            }
        }
        
        this.wrapper = this.wrapper || new MetaMapperWrapper();
        this.wrapper.opt = MetaMapperOption.asDefault(option);
        this.wrapper.mapper = this;
    }


    map<T>(type: ClassConstructorGeneric<T>, obj: any): MapperRtn<T> {
        this.wrapper.clear();

        let rtn = this.mapWith(type, obj);
        rtn.errors = this.wrapper.errors;

        return rtn;
    }

    mapWith<T>(type: ClassConstructorGeneric<T> | MetaBase, obj: any): MapperRtn<T> {
        let meta: MetaBase = null;
        
        if (type instanceof MetaBase) {
            meta = type;
        } else {
            let mc = MetaUtil.getMC(type);
            if (!mc) {
                throw new MetaDefineException(type.toString(), `map: Can't get meta-class based on: ${type}`);
            }
            meta = mc;
        }

        this.wrapper.mapDataStack.push({
            meta: meta,
            obj: obj
        });

        let rtn = mapperFac.map<T>(this.wrapper, meta, obj);

        if (!rtn.mapped && rtn.error) {
            this.wrapper.errors.push(rtn.error);
        }

        this.wrapper.mapDataStack.pop();

        return rtn;
    }
}