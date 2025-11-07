import express from "express";
import multer from "multer";
import { createThumbnail } from "../../middlewares.js";
import {
  getCat,
  getCatById,
  getCatsByUser,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();
const upload = multer({ dest: "uploads/" });

catRouter
  .route("/")
  .get(getCat)
  .post(upload.single("file"), createThumbnail, postCat);
catRouter.route("/:id").get(getCatById).put(putCat).delete(deleteCat);
catRouter.route("/user/:userId").get(getCatsByUser);

export default catRouter;
