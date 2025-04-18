import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "middleware/auth.middleware";

const router = Router();


router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API!",
    status: "success",
  });
});

export default router;