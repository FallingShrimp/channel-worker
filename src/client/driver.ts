import { DriverClient, DriverContext } from "./protocol";

export function defineDriver<P, I extends unknown[]>(data: <E>(context: DriverContext<DriverClient<P, I, E>>) => DriverClient<P, I, E>) {
    return () => {
        const context: DriverContext<DriverClient<P, I, unknown>> = { clients: [] };
        return { driver: data(context), context };
    };
}
