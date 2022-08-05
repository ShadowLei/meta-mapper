export declare type WithStackFunc<T> = (ele: T, idx?: number) => void;

export class Stack<T> {
    private arr: Array<T>;

    constructor(initArr?: Array<T>) {
        this.arr = initArr || new Array<T>();
    }

    get length(): number {
        return this.arr.length;
    }

    push(element: T): void {
        this.arr.push(element);
    }

    pop(): T {
        if (this.arr.length <= 0) { return null; }
        return this.arr.pop();
    }

    peek(): T {
        if (this.arr.length <= 0) { return null; }
        return this.arr[this.arr.length - 1];
    }

    clear(): void {
        this.arr = new Array<T>();
    }

    foreach(func: WithStackFunc<T>): void {
        this.arr.forEach((m, idx) => func(m, idx));
    }
}
