import { text, workerDriver } from "./slots";
import { toWorkerUrl } from "channel-slot/utils/url";

const worker = workerDriver.create(toWorkerUrl(({ a, b, c, text }) => {
    console.log(a, b, c, text);
}, { a: 1, b: 2, c: 3, text }));
