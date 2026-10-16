export interface BaseEvent {
    type: string;
}

export interface SyncEvent<T> extends BaseEvent {
    type: "sync";
    data: T;
    generation: number;
}
export interface InitEvent extends BaseEvent {
    type: "init";
    channel: string;
}

export type Events<T = unknown> = SyncEvent<T> | InitEvent;
export type EventMap<T = unknown> = {
    [K in Events<T> as K["type"]]: K;
}
