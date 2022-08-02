
export interface ClassConstructorGeneric<T> extends Function {
    new(): T;
}

export interface ClassConstructor extends ClassConstructorGeneric<any> {
}
