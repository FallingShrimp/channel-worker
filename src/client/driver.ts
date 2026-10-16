import { DriverClient, DriverContext } from "./protocol";

export function createDriver<P, I extends unknown[]>(data: <E>(context: DriverContext<DriverClient<P, I, E>>) => Omit<DriverClient<P, I, E>, "$INFER">) {
    return <E>() => {
        const context: DriverContext<DriverClient<P, I, E>> = {
            clients: [],
            addClient(...args: I) {
                const client = context.driver.create(...args);
                this.clients.push(client);
                return this;
            },
            driver: null!
        };
        context.driver = {
            ...data<E>(context),
            $INFER: null!
        };
        return context;
    };
}
