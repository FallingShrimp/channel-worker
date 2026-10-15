interface BaseEvent {
    type: EventType;
    timestamp: number;
}
export type EventType = "sync";

export interface SyncEvent<T> extends BaseEvent {
    type: "sync";
    data: T;
}
export type Events<T = unknown> = SyncEvent<T>;
