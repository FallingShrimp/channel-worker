import { createDriver } from "channel-slot/client";

export default createDriver<WebSocket, [url: string]>((context) => ({
    create(url) {
        return new WebSocket(url);
    },
    subscribe(callback) {
        context.clients.forEach(c => c.addEventListener("message", e => callback(e.data)));
    },
    emit(event) {
        context.clients.forEach(c => c.send(JSON.stringify(event)));
    },
}));
