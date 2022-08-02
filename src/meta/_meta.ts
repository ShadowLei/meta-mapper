import { ClassConstructor } from "../define";
import { Any, Enum } from "../mapper";
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

/*
class EnumMeta extends MetaClass {
    constructor() {
        super();
        
        this.rawType = Enum;
    }
}

class AnyMeta extends MetaClass {
    constructor() {
        super();
        
        this.rawType = Any;
    }
}
*/

const mcDefault: MetaClass[] = [];
mcDefault.push(new StringMeta());
mcDefault.push(new NumberMeta());
//mcDefault.push(new EnumMeta());
//mcDefault.push(new AnyMeta());
mcDefault.push(new BooleanMeta());
mcDefault.push(new DateMeta());

export function tryGetDefaultMC(cls: ClassConstructor): MetaClass {
    let rtn = mcDefault.find(m => m.inspectType === cls);
    return rtn;
}