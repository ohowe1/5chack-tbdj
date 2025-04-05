import {
  createPost,
  getPost,
  getPostsByOrganization,
} from "controllers/post.controller";
import { Router, Request, Response } from "express";
import { POST_BACKER_STATUS, POST_STATUS } from "shared/types/post";

const router = Router();

router.get(
  "/feed",
  // TODO: Add authentication middleware here
  // TODO: make it so if a new post is made and the user wants the second page of what they thought was the feed, it will give them what they expect
  // TODO: filters
  async (req: Request, res: Response) => {
    const user = {};
    // const organizationId = req.query.organizationId as string;
    const organizationId = "";
    const postsInOrg = await getPostsByOrganization(organizationId, {
      sort: { created_at: -1 }, // Sort by newest first
      filter: { status: { $ne: POST_STATUS.CANCELED } }, // Exclude canceled posts
    });

    if (!postsInOrg) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(postsInOrg);
  }
);

router.get("/:post_uuid", async (req: Request, res: Response) => {
  const post_uuid = req.params.post_uuid;
  if (!post_uuid) {
    res.status(400).json({ error: "Post UUID is required" });
    return;
  }

  const post = await getPost(post_uuid);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.status(200).json(post);
});

/*
TODO:
- Create post
- Back post
- Complete post
- Review compelteion requests
- Cancel post
- Update post
*/

router.post("/", async (req: Request, res: Response) => {
  const postData = req.body;

  if (!postData || !postData.title || !postData.content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  try {
    const newPost = await createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.post("/back/:post_uuid", async (req: Request, res: Response) => {
  const post_uuid = req.params.post_uuid;
  const { userId, amount } = req.body;

  if (!post_uuid || !userId || !amount) {
    res
      .status(400)
      .json({ error: "Post UUID, user ID, and amount are required" });
    return;
  }

  const post = await getPost(post_uuid);
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
    user: userId,
    amount: amount,
    back_date: new Date(),
    status: POST_BACKER_STATUS.PENDING, // Assuming 0 means pending
  });

  // Save the updated post
  await post.save();

  res.status(200).json(post);
});

export default router;
