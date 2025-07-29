import { Router } from "express";
import { getIssues, createIssue } from "../Controllers/issue.controller.js";
import { authenticateToken } from "../Middleware/auth.middleware.js";

const router = Router();

router.get("/issues", getIssues);
router.post("/issues", authenticateToken, createIssue);

export default router;
