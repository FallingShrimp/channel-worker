import { SelfDriver } from "channel-slot/drivers";
import { text } from "./slots";

text.drive(SelfDriver<string>().addClient(self));

function next() {
    console.log("worker", text.value, text.generation);
    text.value += "+";
    console.log("worker update", text.generation);
    setTimeout(next, 1000);
}
next();
