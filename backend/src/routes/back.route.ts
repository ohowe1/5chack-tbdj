import {
  getPost,
} from "../controllers/post.controller";
import { Router, Request, Response } from "express";
import { POST_BACKER_STATUS } from "shared/types/post";
import { HydratedDocument } from "mongoose";
import { TUser } from "shared/types/user";
import { ensureAuthenticated } from "middleware/auth.middleware";
const router = Router();

router.use(ensureAuthenticated);

router.post("/:post_id", async (req: Request, res: Response) => {
  const post_id = req.params.post_id;
  const user = req.user as HydratedDocument<TUser>;
  const { amount } = req.body;

  if (!post_id || !amount) {
    res.status(400).json({ error: "Post UUID, and amount are required" });
    return;
  }

  console.log(post_id);
  console.log(user)

  const post = await getPost(post_id, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  // Check if the amount is valid
  if (amount <= 0) {
    res.status(400).json({ error: "Amount must be greater than zero" });
    return;
  }

  // TODO handle payment

  // Add the backer to the post's backers array
  post.backers.push({
    user: user._id,
    amount: amount,
    back_date: new Date(),
    status: POST_BACKER_STATUS.PENDING, // Assuming 0 means pending
  });

  // Save the updated post
  await post.save();

  res.status(200).json(post);
});

export default router;
