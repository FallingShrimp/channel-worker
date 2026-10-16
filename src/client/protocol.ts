import { Events } from "./events";

export interface DriverClient<ClientType = unknown, ClientInit extends unknown[] = [], EventType = unknown> {
    create(...args: ClientInit): ClientType;
    subscribe(callback: (event: Events<EventType>) => void, client: ClientType): void;
    emit(event: Events): void;
}
export interface DriverContext<D extends DriverClient = DriverClient> {
    clients: D extends DriverClient<infer P, infer _, infer _> ? P[] : never[];
}
