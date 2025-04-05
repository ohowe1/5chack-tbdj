import { Schema } from "mongoose";
import { UserUUID } from "./user";

export type TOrganization = {
  uuid: string;
  name: string;
  users: UserUUID[] | Schema.Types.ObjectId[];
}
