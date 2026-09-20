import { Router } from "express";
import { getDashboard, updateProfile } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", protect, getDashboard);
router.put("/profile", protect, updateProfile);

export default router;
