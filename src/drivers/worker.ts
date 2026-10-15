import { defineDriver } from "@client/driver";

export default defineDriver<Worker, [string]>(() => {
    const clients: Worker[] = [];
    return {
        subscribe(callback) {
            clients.forEach(w => w.addEventListener("message", e => callback(e.data)));
        },
        emit(event) {
            clients.forEach(w => w.postMessage(event));
        },
        create(url) {
            const instance = new Worker(url);
            clients.push(instance);
            return instance;
        },
        stamp() {
            return performance.now()
        },
    };
});
