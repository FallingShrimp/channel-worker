import { defineDriver } from "channel-slot/client";

export default defineDriver<Worker, [url: string]>((context) => ({
    create(url) {
        return new Worker(url);
    },
    subscribe(callback, client) {
        client.addEventListener("message", e => callback(e.data));
    },
    emit(event) {
        context.clients.forEach(c => c.postMessage(event));
    },
}));
