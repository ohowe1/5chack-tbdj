import { TOrganization } from "./organization";
import { TUser } from "./user";
import { Types } from "mongoose";

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
  user: Types.ObjectId; // User who backed the post
  amount: number; // Amount backed
  back_date: Date; // Date when the backing was made
  status: POST_BACKER_STATUS
}

export type TPost = {
  _id: Types.ObjectId; // Post ID
  title: string;
  description: string;
  author: Types.ObjectId; // User
  total_backed?: number; // Total amount backed, calculated from backers
  backers: TPostBacker[]; // Array of backers
  organization: Types.ObjectId; // Organization
  status: POST_STATUS
  created_at: Date;
  completion_requests?: Types.ObjectId[]; // PostCompletionRequest IDs
}

export type TPostFilled = TPost & {
  total_backed: number; // Total amount backed, filled in
  author: TUser; // Author details filled in
  organization: TOrganization; // Organization details filled in
  completion_requests?: TPostCompletionRequest[]; // Filled in completion requests
};


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
  _id: Types.ObjectId; // Completion request ID
  post: Types.ObjectId; // The post being completed
  requester: Types.ObjectId; // The user requesting the completion
  comment?: string; // Optional reason for the completion request
  response?: string; // Optional response from the post author
  requested_at: Date; // Timestamp of when the request was made
  status: POST_COMPLETION_REQUEST_STATUS; // Current status of the request
}

export type TPostCompletionRequestFilled = TPostCompletionRequest & {
  post: TPost; // The post being completed
  requester: TUser; // The user requesting the completion
}
