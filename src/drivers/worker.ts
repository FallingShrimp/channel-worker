import { createDriver } from "channel-slot/client";

export default createDriver<Worker, [url: string]>((context) => ({
    create(url) {
        return new Worker(url);
    },
    subscribe(callback) {
        context.clients.forEach(c => c.addEventListener("message", e => callback(e.data)));
    },
    emit(event) {
        context.clients.forEach(c => c.postMessage(event));
    },
    hooks: {
        timestamp() {
            return performance.now();
        },
    }
}));
