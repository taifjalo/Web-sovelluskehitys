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

<<<<<<< HEAD
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(getCat)
  .post(upload.single("file"), createThumbnail, postCat);

router.route("/:id").get(getCatById).put(putCat).delete(deleteCat);
=======
const catRouter = express.Router();
const upload = multer({ dest: "uploads/" });

catRouter
  .route("/")
  .get(getCat)
  .post(upload.single("file"), createThumbnail, postCat);
catRouter.route("/:id").get(getCatById).put(putCat).delete(deleteCat);
catRouter.route("/user/:userId").get(getCatsByUser);
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344

export default router;
