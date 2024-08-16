import express from "express";
const router = express.Router();

import { getAuthor, getAuthorById } from "../controllers/authorController.js";

router.route("/").get(getAuthor);

router.route("/:id").get(getAuthorById);

export default router;
