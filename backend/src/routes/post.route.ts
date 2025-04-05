import { getPostsByOrganization } from "controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get(
  "/feed",
  async (req, res) => {
    // authenticate

    const user = {};
    const postsInOrg = await getPostsByOrganization(user?.organization?.toString());

    if (!postsInOrg) {
      return res.status(404).json({ message: "Feed Empty" });
    }

    return res.status(200).json(postsInOrg);
  }
)
