import { ChannelSlot } from "channel-slot/client";
import { WorkerDriver } from "channel-slot/drivers";

export const workerDriver = WorkerDriver<string>();
export const text = new ChannelSlot("text", "").drive(workerDriver);
