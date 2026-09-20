import { Router } from "express";
import { submitContact } from "../controller/contact.controller.js";

const router = Router();

router.post("/", submitContact);

export default router;
