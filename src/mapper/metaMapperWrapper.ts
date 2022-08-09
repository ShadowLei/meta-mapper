import { Stack } from "../util";
import { MetaMapper } from "./metaMapper";
import { MetaProcessData } from "./metaProcessData";
import { MapperRtnError } from "./typeMapper/iTypeMapper";
import { MetaMapperOption } from "./_model";

export class MetaMapperWrapper {
    opt: MetaMapperOption;
    mapper: MetaMapper;

    mapDataStack: Stack<MetaProcessData>;
    errors: MapperRtnError[];

    constructor() {
        this.mapDataStack = new Stack<MetaProcessData>();
        this.errors = [];
    }

    clear() {
        this.mapDataStack.clear();
        this.errors = [];
    }
    
    getStackName(): string {
        let name = [];
        this.mapDataStack.foreach((ele, idx) => {
            name.push(ele.meta.getMapKey(this.opt.from));
        });

        return name.join(".");
    }
}