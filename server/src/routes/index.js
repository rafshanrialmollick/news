import { Router } from "express";
import newsRoutes from "./news.Routes.js";
import authRoutes from "./auth.Routes.js";
import userRoutes from "./user.Routes.js";
import contactRoutes from "./contact.Routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/news", newsRoutes);
router.use("/contact", contactRoutes);

export default router;
