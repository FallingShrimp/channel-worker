import { Events } from "./events";

export interface DriverHooks {
    timestamp(): number;
}
export interface DriverClient<ClientType = unknown, ClientInit extends unknown[] = [], EventType = unknown> {
    create(...args: ClientInit): ClientType;
    subscribe(callback: (event: Events<EventType>) => void): void;
    emit(event: Events): void;
    hooks?: Partial<DriverHooks>;
}
export interface DriverContext<D extends DriverClient = DriverClient, P = D extends DriverClient<infer P, infer _, infer _> ? P : never> {
    clients: P[];
    eachClient(): Generator<P>;
}
