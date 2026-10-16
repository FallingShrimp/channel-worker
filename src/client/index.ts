import { ChannelSlot } from "./channel";

export function channel<T>(value: T) {
    return new ChannelSlot(crypto.randomUUID(), value);
}

export * from "./channel";
export * from "./driver";
export * from "./events";
export * from "./protocol";
