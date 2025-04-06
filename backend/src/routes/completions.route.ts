import {
  approveCompletionRequest,
  createCompletionRequest,
  getCompletionRequest,
  getCompletionRequestsByPost,
  getCompletionRequestsByPostAuthor,
} from "../controllers/completion.controller";
import { getPost } from "../controllers/post.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware";
import { HydratedDocument } from "mongoose";
import { POST_COMPLETION_REQUEST_STATUS, POST_STATUS } from "shared/types/post";
import { TUser } from "shared/types/user";

const router = Router();

router.use(ensureAuthenticated);

router.post("/", async (req, res) => {
  const { post_id, comment } = req.body as {
    post_id?: string;
    comment?: string;
  };
  const user = req.user as HydratedDocument<TUser>;

  if (!post_id) {
    res.status(400).json({ error: "Post ID is required" });
    return;
  }

  const post = await getPost(post_id, user.organization);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  if (post.status !== POST_STATUS.OPEN) {
    res.status(400).json({ error: "Post is not open for completion requests" });
    return;
  }

  const completionResponse = await createCompletionRequest(
    post_id,
    user._id,
    comment
  );

  if (!completionResponse) {
    res.status(500).json({ error: "Failed to create completion request" });
    return;
  }

  res.status(200).json(completionResponse);
});

router.post("/:completion_id/gavel", async (req, res) => {
  const user = req.user as HydratedDocument<TUser>;

  const { completion_id } = req.params;
  const { decision } = req.body as {
    decision?: "approve" | "decline";
  };

  if (!completion_id) {
    res.status(400).json({ error: "Completion ID is required" });
    return;
  }
  if (!decision || (decision !== "approve" && decision !== "decline")) {
    res.status(400).json({ error: "Decision must be 'approve' or 'reject'" });
    return;
  }

  const completionRequest = await getCompletionRequest(completion_id);

  if (!completionRequest) {
    res.status(404).json({ error: "Completion request not found" });
    return;
  }

  if (!(completionRequest.post.author).equals(user._id)) {
    res
      .status(403)
      .json({ error: "You are not authorized to make this decision" });
    return;
  }

  if (decision === "approve") {
    await approveCompletionRequest(completionRequest._id);
  } else if (decision === "decline") {
    completionRequest.status = POST_COMPLETION_REQUEST_STATUS.DENIED; // Update the status to denied
    await completionRequest.save();
  }


  res.status(200).json(completionRequest)
});

router.get("/to_review", async (req, res) => {
  const user = req.user as HydratedDocument<TUser>;
  const completionRequests = await getCompletionRequestsByPostAuthor(user._id);
  console.log("Fetched completion requests for review:", completionRequests);

  if (!completionRequests || completionRequests.length === 0) {
    res.status(200).json([]);
    return;
  }
  res.status(200).json(completionRequests);
});

export default router;
