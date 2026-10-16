import { WorkerDriver } from "channel-slot/drivers";
import { text } from "./slots";

text.drive(WorkerDriver<string>().addClient());
