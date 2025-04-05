import { UUID } from "./global"
import { TOrganization } from "./organization";
import { TUser, UserUUID } from "./user";
import { Schema } from "mongoose";

export enum POST_STATUS {
  OPEN = 0,
  COMPLETED,
  CANCELED
}
export enum POST_BACKER_STATUS {
  PENDING = 0,
  CONFIRMED,
  CANCELED
}

export type TPostBacker = {
  user: Schema.Types.ObjectId; // User who backed the post
  amount: number; // Amount backed
  back_date: Date; // Date when the backing was made
  status: POST_BACKER_STATUS
}

export type TPost = {
  uuid: UUID,
  title: string;
  description: string;
  author: Schema.Types.ObjectId; // User
  total_backed?: number; // Total amount backed, calculated from backers
  backers: TPostBacker[]; // Array of backers
  organization: Schema.Types.ObjectId; // Organization
  status: POST_STATUS
  created_at: Date;
  completion_requests?: Schema.Types.ObjectId[]; // PostCompletionRequest IDs
}

export type TPostWithAuthorAndOrg = TPost & {
  user: TUser;
  organization: TOrganization;
};

export enum POST_COMPLETION_REQUEST_STATUS {
  PENDING = 0,
  APPROVED,
  DENIED
}

export type TPostCompletionRequest = {
  post: Schema.Types.ObjectId; // The post being completed
  requester: Schema.Types.ObjectId; // The user requesting the completion
  comment?: string; // Optional reason for the completion request
  response?: string; // Optional response from the post author
  requested_at: Date; // Timestamp of when the request was made
  status: POST_COMPLETION_REQUEST_STATUS; // Current status of the request
}
