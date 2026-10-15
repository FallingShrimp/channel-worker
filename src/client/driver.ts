import { MessageDriver } from "./protocol";

export function defineDriver<T, I extends unknown[]>(data: <E>() => MessageDriver<T, I, E>): <E>() => MessageDriver<T, I, E> {
    return () => data();
}
