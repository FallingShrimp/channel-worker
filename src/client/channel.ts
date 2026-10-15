import { Events } from "./events";
import { MessageDriver } from "./protocol";

export class ChannelSlot<T> {
    private drivers: MessageDriver<unknown, unknown[], T>[];

    constructor(public name: string, private currentValue: T) {
        this.drivers = [];
    }

    get value(): T {
        return this.currentValue;
    }
    set value(value: T) {
        this.update(value);
        this.emit("sync", { data: value });
    }

    private update(value: T) {
        this.currentValue = value;
    }
    private emit(type: Events["type"], event: Omit<Events, "timestamp" | "type">) {
        this.drivers.forEach(d => d.emit({ ...event, type, timestamp: d.stamp() }));
    }

    public listen(driver: MessageDriver<unknown, unknown[], T>) {
        this.drivers.push(driver);
        driver.subscribe((e) => {
            if (e.type === "sync") { this.update(e.data); }
        });
    }
}
