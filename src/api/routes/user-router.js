import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";

const router = express.Router();

<<<<<<< HEAD
router.route("/").get(getUser).post(postUser);

router.route("/:id").get(getUserById).put(putUser).delete(deleteUser);
=======
userRouter.route("/").get(getUser).post(postUser);
userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344

export default router;
