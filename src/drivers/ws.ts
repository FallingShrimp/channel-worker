import { defineDriver } from "channel-slot/client";

export default defineDriver<WebSocket, [url: string]>((context) => ({
    create(url) {
        return new WebSocket(url);
    },
    subscribe(callback, client) {
        client.addEventListener("message", e => callback(e.data));
    },
    emit(event) {
        context.clients.forEach(c => c.send(JSON.stringify(event)));
    },
}));
