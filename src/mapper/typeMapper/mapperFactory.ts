import { MetaBase } from "../../meta/_model";
import { MetaMapperWrapper } from "../metaMapperWrapper";
import { MapperRtn } from "../model";
import { AnyMapper } from "./anyMapper";
import { ArrayMapper } from "./arrayMapper";
import { BooleanMapper } from "./booleanMapper";
import { DateMapper } from "./dateMapper";
import { EnumMapper } from "./enumMapper";
import { IMetaTypeMapper } from "./iTypeMapper";
import { NumberMapper } from "./numberMapper";
import { ObjectMapper } from "./objectMapper";
import { StringMapper } from "./stringMapper";

export class MapperFactory {
    private mappers: IMetaTypeMapper[];

    constructor() {
        this.mappers = [];
        this.mappers.push(new BooleanMapper());
        this.mappers.push(new StringMapper());
        this.mappers.push(new NumberMapper());
        this.mappers.push(new DateMapper());
        this.mappers.push(new AnyMapper());
        this.mappers.push(new EnumMapper());
        this.mappers.push(new ArrayMapper());
        this.mappers.push(new ObjectMapper());
    }

    map<T>(wrapper: MetaMapperWrapper, meta: MetaBase, obj: object): MapperRtn<T> {
        let rtn: MapperRtn<T> = null;

        for (let m of this.mappers) {
            if (!m.match(meta)) { continue; }

            rtn = m.map<T>(wrapper, meta, obj);

            if (!rtn.mapped && rtn.error) {
                rtn.error.name = wrapper.getStackName();
            }

            return rtn;
        }
        
        //unmatched
        rtn = {
            mapped: false,
            error: {
                name: wrapper.getStackName(),
                code: "Mismatch",
                reason: `Can't find a proper mapper from factory: ${meta.inspectType?.name}`
            }
        };

        return rtn;
    }
}