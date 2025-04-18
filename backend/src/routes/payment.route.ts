import { getPost } from "../controllers/post.controller";
import { captureOrder, createOrder, refundPayment } from "../core/payment";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware";
import { HydratedDocument } from "mongoose";
import { POST_BACKER_STATUS } from "shared/types/post";
import { TUser } from "shared/types/user";
import mongoose from "mongoose";

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

  const { orderID } = await createOrder(amount);

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

  if (
    !captureResult ||
    !captureResult.status ||
    captureResult.status !== "COMPLETED"
  ) {
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

// router.post("/refund/:orderId", async (req, res) => {
//   const user = req.user as HydratedDocument<TUser>;
//   const { orderId } = req.params;

//   if (!orderId) {
//     res.status(400).json({ error: "Order ID is required" });
//     return;
//   }

//   // Find the post associated with this order
//   const posts = await mongoose.model("Post").find({
//     "backers.order_id": orderId,
//     organization: user.organization,
//   });

//   if (!posts || posts.length === 0) {
//     res.status(404).json({ error: "No post found with this order ID" });
//     return;
//   }

//   const post = posts[0];

//   // Check if user is authorized (either the post author or the backer)
//   const backer = post.backers.find((b) => b.order_id === orderId);
//   if (!backer) {
//     res.status(404).json({ error: "Backing not found" });
//     return;
//   }

//   // Check if user is post author or the backer
//   const isAuthor = post.author.toString() === user._id.toString();
//   const isBacker = backer.user.toString() === user._id.toString();

//   if (!isAuthor && !isBacker) {
//     res.status(403).json({ error: "Not authorized to refund this payment" });
//     return;
//   }

//   // Process the refund
//   const refundResult = await refundPayment(orderId);

//   if (!refundResult) {
//     res.status(500).json({ error: "Failed to process refund" });
//     return;
//   }

//   // Update the backer status
//   backer.status = POST_BACKER_STATUS.CANCELED;
//   await post.save();

//   res.status(200).json({
//     success: true,
//     message: "Payment refunded successfully",
//     refundId: refundResult.id,
//   });
// });

export default router;
