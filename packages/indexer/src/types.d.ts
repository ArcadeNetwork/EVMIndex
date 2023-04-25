import {Mongoose} from "mongoose";
import {Unstake} from "@/db/models/UnStake";

export type Contract = {
  name: string
  address: string
  startBlock: number
  abi: Record<string, unknown>[]
  events: string[]
  topic?: string,
  model: Mongoose.Model<T, {}>,
  primaryProperty: Array<keyof Unstake>,
  webhook?: string
}
