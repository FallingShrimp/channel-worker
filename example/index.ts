import { WorkerDriver } from "channel-slot/drivers";
import { text } from "./slots";
import code from "../dist/example/worker.js?raw";
import { toWorkerUrl } from "channel-slot/utils/url";

const url = toWorkerUrl(code, { a: 1, b: 2, c: 3 });
text.drive(WorkerDriver<string>().addClient(url));

function next() {
    console.log("top", text.value);
    text.value += "!";
    console.log("update", text.generation);
    setTimeout(next, 2000);
}
next();
