import { timestamp } from "channel-slot/utils/time";
import { BaseEvent, EventMap, Events } from "./events";
import { DriverClient, DriverContext } from "./protocol";

export class ChannelSlot<T> {
    private drivers: DriverClient<unknown, unknown[], T>[];
    private latestGeneration: number = 0;

    constructor(public name: string, private currentValue: T) {
        this.drivers = [];
    }

    get value(): T {
        return this.currentValue;
    }
    set value(value: T) {
        this.update(value);
        this.emit("sync", { data: value, generation: ++this.latestGeneration });
    }
    get generation(): number {
        return this.latestGeneration;
    }

    private update(value: T) {
        this.currentValue = value;
    }
    private emit<E extends keyof EventMap>(
        type: E,
        event: Omit<EventMap[E], keyof BaseEvent>
    ) {
        this.drivers.forEach(d => d.emit({ ...event, type } as EventMap<T>[E]));
    }

    public drive(...drivers: DriverContext<DriverClient<unknown, unknown[], T>>[]) {
        for (const context of drivers) {
            this.drivers.push(context.driver);
            context.driver.subscribe((e) => {
                if (e.type === "sync") {
                    if (e.generation < this.latestGeneration) {
                        this.emit("sync", { data: this.value, generation: this.latestGeneration });
                    } else {
                        this.update(e.data);
                        this.latestGeneration = e.generation;
                    }
                }
            });
        }
        return this;
    }
}
