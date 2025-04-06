import { getUserById } from "../controllers/user.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware";
import { HydratedDocument } from "mongoose";
import { TUser } from "shared/types/user";

const router = Router();

router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

router.get("/:user_id", async (req, res) => {
  const reqUser = req.user as HydratedDocument<TUser>;
  const user_id = req.params.user_id;
  if (!user_id) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }
  const foundUser = await getUserById(user_id);
  if (!foundUser || foundUser.organization !== reqUser.organization) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(foundUser);
});

router.post("/update-email", async (req, res) => {
  const user = req.user as HydratedDocument<TUser>;
  const { email } = req.body as { email?: string };
  if (!email || !email.trim()) {
    res.status(400).json({ error: "Email is required" });
    return;
  }
  user.payoutEmail = email.trim();
  await user.save();

  res
    .status(200)
    .json({ message: "Email updated successfully", email: user.payoutEmail });
});

export default router;
