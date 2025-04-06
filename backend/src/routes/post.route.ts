import {
  createPost,
  getPost,
  getPostsByCompletingUser,
  getPostsByOrganization,
} from "../controllers/post.controller";
import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware";
import { POST_STATUS, POST_BACKER_STATUS } from "shared/types/post";
import { HydratedDocument } from "mongoose";
import { TUser } from "shared/types/user";

const router = Router();

router.use(ensureAuthenticated);

router.get(
  "/feed",
  // TODO: Add authentication middleware here
  // TODO: make it so if a new post is made and the user wants the second page of what they thought was the feed, it will give them what they expect
  // TODO: filters
  async (req: Request, res: Response) => {
    const user: HydratedDocument<TUser> = req.user as HydratedDocument<TUser>;

    const postsInOrg = await getPostsByOrganization(user.organization, {
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

router.get(
  "/feed/self",
  async (req: Request, res: Response) => {
    const user: HydratedDocument<TUser> = req.user as HydratedDocument<TUser>;

    const postsInOrg = await getPostsByOrganization(user.organization, {
      sort: { created_at: -1 }, // Sort by newest first
      filter: {
        status: { $ne: POST_STATUS.CANCELED },
        author: user._id,
      }, // posts not by author?
    });

    if (!postsInOrg) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(postsInOrg);
  }
);

router.get("/feed/other-self", async (req: Request, res: Response) => {
  const user: HydratedDocument<TUser> = req.user as HydratedDocument<TUser>;

  const postsToUse = await getPostsByCompletingUser(user._id, {
    sort: { created_at: -1 }, // Sort by newest first
    filter: {
      status: { $ne: POST_STATUS.CANCELED }, // Exclude canceled posts
    },
  });

  if (!postsToUse) {
    res.status(200).json([]);
    return;
  }
  res.status(200).json(postsToUse);
});

router.get("/:post_id", async (req: Request, res: Response) => {
  const reqUser = req.user as HydratedDocument<TUser>;
  const post_id = req.params.post_id;
  if (!post_id) {
    res.status(400).json({ error: "Post ID is required" });
    return;
  }

  const post = await getPost(post_id, reqUser.organization);

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
  const { title, description } = req.body;
  const user = req.user as HydratedDocument<TUser>;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  const postData = {
    title: title.trim(),
    description: description.trim(),
    author: user._id, // Ensure author is set to the current user
    organization: user.organization,
    status: POST_STATUS.OPEN,
  };

  const newPost = await createPost(postData);
  res.status(201).json(newPost);
});

router.put("/:post_id", async (req: Request, res: Response) => {
  const user = req.user as HydratedDocument<TUser>;
  const post_id = req.params.post_id;
  const { title, description, status } = req.body;
  if (!post_id) {
    res.status(400).json({ error: "Post ID is required" });
    return;
  }
  const post = await getPost(post_id, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  if (!post.author._id.equals(user._id)) {
    res
      .status(403)
      .json({ error: "You are not authorized to update this post" });
    return;
  }

  // Update only the fields that are provided
  if (title !== undefined) {
    post.title = title.trim();
  }
  if (description !== undefined) {
    post.description = description.trim();
  }
  if (status !== undefined) {
    // TODO: do some logic with this

    // Ensure the status is a valid POST_STATUS
    if (Object.values(POST_STATUS).includes(status)) {
      post.status = status;
    } else {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }
  }
  await post.save();
  res.status(200).json(post);
});

// for commission backers
// Route to back a post with a commission
router.post("/commission/:post_id", async (req: Request, res: Response) => {
  const user = req.user as HydratedDocument<TUser>;
  const post_id = req.params.post_id;
  const { commission } = req.body;

  if (!post_id || !commission) {
    res.status(400).json({ error: "Post ID and commission are required" });
    return;
  }

  const post = await getPost(post_id, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  // Add the commission backer to the post
  const commissionBacker = {
    user: user._id,
    commission: commission.trim(),
    back_date: new Date(),
    status: POST_BACKER_STATUS.PENDING, // Assuming 0 means pending
  };
  post.commission_backers.push(commissionBacker);

  await post.save();

  res.status(200).json({ message: "Commission added successfully", post });
});


export default router;
