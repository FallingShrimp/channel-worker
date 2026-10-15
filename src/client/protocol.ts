import { Events } from "./events";

export interface MessageDriver<C = unknown, I extends unknown[] = [], E = unknown> {
    create(...args: I): C;
    subscribe(callback: (event: Events<E>) => void): void;
    emit(event: Events): void;
    stamp(): number;
}
