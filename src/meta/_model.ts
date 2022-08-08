import { ClassConstructor } from "../define";
import { MetaMapOn } from "../mapper";

export declare type ValidateFuncType = (target: any, ...params: any) => boolean;

export class MetaPropertyValidator {
    validateFunc: ValidateFuncType;
    params: Array<any>;

    errCode: string;
    errMsg: string;
}

export class MetaBase {
    key: string;
    name: string;
    
    rawType: ClassConstructor;       //NOTE: When it's Enum, it can be either "Object" or "Number" when via reflect.
    metaTypes: Function[];

    constructor() {
        this.metaTypes = [];
    }

    get inspectType(): ClassConstructor {
        return (this.metaTypes[0] || this.rawType) as ClassConstructor;
    }

    getMapKey(mapOn: MetaMapOn): string {
        return mapOn === MetaMapOn.PropertyKey ? this.key : this.name;
    }
}

export class MetaClass extends MetaBase {
    properties: MetaProperty[];

    constructor() {
        super();
        this.properties = [];
    }

    get inspectType(): ClassConstructor {
        return this.rawType;
    }
}

export class MetaProperty extends MetaBase {
    validators: MetaPropertyValidator[];

    constructor() {
        super();
        this.validators = [];
    }
}

export class MetaArray extends MetaBase {
    idx: number;
}
