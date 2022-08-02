
export class MetaDefineException {
    public type: string = "Meta";

    constructor(public code: string, public msg: string, public exp?: string) {
    }
}
