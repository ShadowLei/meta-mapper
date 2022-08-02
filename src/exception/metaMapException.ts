
export class MetaMapException {
    public type: string = "Meta";
    public code: string = "MetaMapException";

    constructor(public key: string, public msg: string, public exp?: string) {
    }
}
