import { ClassConstructorGeneric } from "../define";
import { MetaUtil } from "../util";
import { MapperRtn } from "./typeMapper/itypeMapper";
import { MapperFactory } from "./typeMapper";
import { MetaMapperOption, MetaMapperWrapper } from "./_model";
import { MetaDefineException } from "../exception";
import { mapperFac } from "./_const";
import { MetaBase } from "../meta/_model";

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

    map<T>(type: ClassConstructorGeneric<T> | MetaBase, obj: any): MapperRtn<T> {
        let meta: MetaBase = null;
        
        if (type instanceof MetaBase) {
            meta = type;
        } else {
            let mc = MetaUtil.getMC(type);
            if (!mc) {
                throw new MetaDefineException(type.toString(), `map: Can't get meta-class based on ${type}`);
            }
            meta = mc;
        }

        return mapperFac.map<T>(this.wrapper, meta, obj);
    }
}