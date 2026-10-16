import { SelfDriver } from "channel-slot/drivers";
import { text } from "./slots";

text.drive(SelfDriver<string>().addClient(self));
