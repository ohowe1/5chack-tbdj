import { TPost, TPostFilled } from "./post";

export type CreateOrderResponse = {
  orderID: string; // The ID of the created order
  post: TPostFilled
};
