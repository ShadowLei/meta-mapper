import { BooleanUtil } from "../util";
import { MetaMapper } from "./metaMapper";


export class Enum {
}

export class Any {
}

export enum MetaMapOn {
    Key = "Key",
    Meta = "Meta"
}

export class MetaMapperOption {
    from: MetaMapOn;
    to: MetaMapOn;
    
    ignoreUndefined: boolean;
    ignoreNull: boolean;

    validate: boolean;
    validateNull: boolean;

    keepArrayLengthMatch: boolean;

    swallowException: boolean;

    static asDefault(raw?: Partial<MetaMapperOption>): MetaMapperOption {
        let rtn = (raw || new MetaMapperOption()) as MetaMapperOption;

        rtn.from = rtn.from || MetaMapOn.Key;
        rtn.to = rtn.to || MetaMapOn.Key;

        rtn.ignoreUndefined = BooleanUtil.asDefault(rtn.ignoreUndefined, true);
        rtn.ignoreNull = BooleanUtil.asDefault(rtn.ignoreNull, false);

        rtn.validate = BooleanUtil.asDefault(rtn.validate, true);
        rtn.validateNull = BooleanUtil.asDefault(rtn.validateNull, true);

        rtn.keepArrayLengthMatch = BooleanUtil.asDefault(rtn.validateNull, true);

        rtn.swallowException = BooleanUtil.asDefault(rtn.swallowException, false);
        
        return rtn;
    }
}

export class MetaMapperWrapper {
    opt: MetaMapperOption;
    mapper: MetaMapper;
}