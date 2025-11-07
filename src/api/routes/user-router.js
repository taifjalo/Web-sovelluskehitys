import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.route("/").get(getUser).post(postUser);

router.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default router;
