import { ClassConstructor } from "../define";
import { MetaClass } from "./_model";

class StringMeta extends MetaClass {
    constructor() {
        super();

        this.rawType = String;
    }
}

class NumberMeta extends MetaClass {
    constructor() {
        super();

        this.rawType = Number;
    }
}

class BooleanMeta extends MetaClass {
    constructor() {
        super();
        
        this.rawType = Boolean;
    }
}

class DateMeta extends MetaClass {
    constructor() {
        super();
        
        this.rawType = Date;
    }
}

const mcDefault: MetaClass[] = [];
mcDefault.push(new StringMeta());
mcDefault.push(new NumberMeta());
mcDefault.push(new BooleanMeta());
mcDefault.push(new DateMeta());

export function tryGetMCWithBaseType(cls: ClassConstructor): MetaClass {
    let rtn = mcDefault.find(m => m.inspectType === cls);
    return rtn;
}