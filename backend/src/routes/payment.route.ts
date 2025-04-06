import { getPost } from "../controllers/post.controller";
import { captureOrder, createOrder } from "../core/payment";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware";
import { HydratedDocument } from "mongoose";
import { POST_BACKER_STATUS } from "shared/types/post";
import { TUser } from "shared/types/user";

const router = Router();

router.use(ensureAuthenticated);

router.post("/create-order", async (req, res) => {
  const user = req.user as HydratedDocument<TUser>;
  const { postId, amount } = req.body as {
    postId?: string;
    amount?: number;
  };

  if (!postId || !amount || amount <= 0) {
    res.status(400).json({ error: "Invalid post ID or amount" });
    return;
  }

  const post = await getPost(postId, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  if (amount <= 0) {
    res.status(400).json({ error: "Amount must be greater than zero" });
    return;
  }

  const {orderID} = await createOrder(amount);

  if (!orderID) {
    res.status(500).json({ error: "Failed to create PayPal order" });
    return;
  }

  res.status(200).json({ orderID: orderID, post: post });
});

router.post("/capture-order", async (req, res) => {
  const user = req.user as HydratedDocument<TUser>;
  const { orderID, postId } = req.body as {
    orderID?: string;
    postId?: string;
  };

  if (!orderID || !postId) {
    res.status(400).json({ error: "Invalid order ID or post ID" });
    return;
  }

  const post = await getPost(postId, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const captureResult = await captureOrder(orderID);

  if (!captureResult || !captureResult.status || captureResult.status !== "COMPLETED") {
    res.status(500).json({ error: "Failed to capture PayPal order" });
    return;
  }

  post.backers.push({
    user: user._id,
    order_id: orderID, // Store the order ID for reference
    amount: captureResult.purchase_units[0].payments.captures[0].amount.value, // Capture the amount from the order
    back_date: new Date(),
    status: POST_BACKER_STATUS.CONFIRMED, // Assuming 0 means pending
  });

  await post.save();

  res.status(200).json(post);
});

export default router;