import express from "express";
import multer from "multer";
import { createThumbnail } from "../../middlewares.js";

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(getCat)
  .post(upload.single("file"), createThumbnail, postCat);

router.route("/:id").get(getCatById).put(putCat).delete(deleteCat);

export default router;
