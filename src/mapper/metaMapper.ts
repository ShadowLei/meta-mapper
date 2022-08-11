import { ClassConstructorGeneric } from "../define";
import { MetaUtil } from "../util";
import { MapperRtn, MetaMapperOption } from "./model";
import { MetaDefineException } from "../exception";
import { mapperFac, metaValidator } from "./_const";
import { MetaBase, MetaProperty } from "../meta/_model";
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

        let meta = MetaUtil.getMCWithBaseType(type);
        if (!meta) {
            throw new MetaDefineException(type.toString(), `map: Can't get meta-class based on: ${type}`);
        }
        let mapRtn = this.mapWithMeta<T>(meta, obj);
        
        //copy & output
        let rtn: MapperRtn<T> = {
            mapped: mapRtn.mapped,
            rtn: mapRtn.rtn,
            errors: this.wrapper.errors
        };

        return rtn;
    }

    //don't call: internal usage
    mapWithType<T>(type: ClassConstructorGeneric<T>, obj: any): MapperRtn<T> {
        let meta = MetaUtil.getMC(type);
        if (!meta) {
            throw new MetaDefineException(type.toString(), `map: Can't get meta-class based on: ${type}`);
        }

        return this.mapWithMeta<T>(meta, obj);
    }

    //don't call: internal usage
    mapWithMeta<T>(meta: MetaBase, obj: any): MapperRtn<T> {
        this.wrapper.mapDataStack.push({
            meta: meta,
            obj: obj
        });

        let rtn = mapperFac.map<T>(this.wrapper, meta, obj);

        if (!rtn.mapped && rtn.error) {
            this.wrapper.errors.push(rtn.error);
        }
        //validation
        else if (rtn.mapped && (meta instanceof MetaProperty)) {
            let errors = metaValidator.validate(this.wrapper, meta, rtn.rtn);
            if (errors?.length > 0) {
                rtn.mapped = false;
                rtn.rtn = null;
                rtn.error = errors[errors.length - 1];
                this.wrapper.errors.push(...errors);
            }
        }

        this.wrapper.mapDataStack.pop();

        return rtn;
    }
}