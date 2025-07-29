import { Router } from "express";
import { castVote } from "../Controllers/vote.controller.js";
import { authenticateToken } from "../Middleware/auth.middleware.js";

const router = Router();

router.post("/cast", authenticateToken, castVote);

export default router;
