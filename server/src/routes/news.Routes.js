import { Router } from "express";
import {
  creatNews,
  getTop6News,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  getAllNewsByfilter,
  getCategory,
  addComment,
} from "../controller/news.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/top6", getTop6News);
router.get("/category", getCategory);
router.get("/allnews", getAllNews);

router.route("/")
  .get(getAllNewsByfilter)
  .post(protect, creatNews);

router.route("/:id")
  .get(getNewsById)
  .put(protect, updateNews)
  .patch(protect, updateNews)
  .delete(protect, deleteNews);

router.post("/:id/comments", protect, addComment);

export default router;
