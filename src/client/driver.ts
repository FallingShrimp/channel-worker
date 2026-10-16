import { DriverClient, DriverContext } from "./protocol";

export function createDriver<P, I extends unknown[]>(data: <E>(context: DriverContext<DriverClient<P, I, E>>) => DriverClient<P, I, E>) {
    return () => {
        const context: DriverContext<DriverClient<P, I, unknown>> = {
            clients: [],
            *eachClient() {
                for (const client of this.clients) {
                    yield client;
                }
            },
        };
        return { driver: data(context), context };
    };
}
