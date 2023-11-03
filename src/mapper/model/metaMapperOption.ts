import { BooleanUtil } from "../../util";
import { MetaMapOn } from "./define";

export class MetaMapperOption {
    from: MetaMapOn;
    to: MetaMapOn;
    
    validate: boolean;
    validateUndefined: boolean;
    validateNull: boolean;

    keepNullVal: boolean;
    keepOriginVal: boolean;
    keepArrayLengthMatch: boolean;

    static asDefault(raw?: Partial<MetaMapperOption>): MetaMapperOption {
        let rtn = (raw || new MetaMapperOption()) as MetaMapperOption;

        rtn.from = rtn.from || MetaMapOn.PropertyKey;
        rtn.to = rtn.to || MetaMapOn.PropertyKey;

        rtn.validate = BooleanUtil.asDefault(rtn.validate, true);
        rtn.validateUndefined = BooleanUtil.asDefault(rtn.validateUndefined, false);
        rtn.validateNull = BooleanUtil.asDefault(rtn.validateNull, true);
        rtn.keepNullVal = BooleanUtil.asDefault(rtn.keepNullVal, false);
        rtn.keepOriginVal = BooleanUtil.asDefault(rtn.keepOriginVal, false);

        rtn.keepArrayLengthMatch = BooleanUtil.asDefault(rtn.keepArrayLengthMatch, true);
        
        return rtn;
    }
}

