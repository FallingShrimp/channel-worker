import { Events } from "./events";

export interface DriverHooks {
    timestamp(): number;
}
export interface DriverClient<ClientType = unknown, ClientInit extends unknown[] = unknown[], EventType = unknown> {
    create(...args: ClientInit): ClientType;
    subscribe(callback: (event: Events<EventType>) => void): void;
    emit(event: Events): void;
    hooks?: Partial<DriverHooks>;
    $INFER: {
        clientType: ClientType;
        clientInit: ClientInit;
    }
}
export interface DriverContext<D extends DriverClient = DriverClient> {
    driver: D;
    clients: D["$INFER"]["clientType"][];
    addClient(...args: DriverClient["$INFER"]["clientInit"]): DriverContext<D>;
}
