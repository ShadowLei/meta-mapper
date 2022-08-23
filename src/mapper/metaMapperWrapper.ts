import { GenericNameType } from "../define";
import { Stack } from "../util";
import { MetaMapper } from "./metaMapper";
import { MetaProcessData } from "./metaProcessData";
import { MapperError, MetaMapOn, MetaMapperOption } from "./model";

export class MetaMapperWrapper {
    opt: MetaMapperOption;
    mapper: MetaMapper;

    mapDataStack: Stack<MetaProcessData>;
    errors: MapperError[];

    genericTypes?: Array<GenericNameType>;

    constructor() {
        this.mapDataStack = new Stack<MetaProcessData>();
        this.errors = [];
    }

    clear() {
        this.mapDataStack.clear();
        this.errors = [];
        this.genericTypes = null;
    }

    getMetaName(): string {
        let name = [];
        this.mapDataStack.foreach((ele, idx) => {
            name.push(ele.meta.getMapKey(MetaMapOn.MetaName));
        });

        return name.join(".");
    }
}