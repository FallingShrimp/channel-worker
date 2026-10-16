import { createDriver } from "channel-slot/client";

export default createDriver<Window & typeof globalThis, [self: Window & typeof globalThis]>((context) => ({
    create(self) {
        return self;
    },
    subscribe(callback) {
        context.clients.forEach(c => c.addEventListener("message", e => callback(e.data)));
    },
    emit(event) {
        context.clients.forEach(c => c.postMessage(event));
    },
}));
