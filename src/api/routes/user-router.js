import express from "express";
import { body } from "express-validator";

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";

import { validationErrors } from "../../middlewares.js";
const router = express.Router();

// ✅ GET all users + POST (with validation)
router
  .route("/")
  .get(getUser)
  .post(
    // ✅ Validation rules
    body("email").trim().isEmail().withMessage("Invalid email format"),

    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3-20 characters")
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),

    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    validationErrors, // ✅ MUST run before postUser
    postUser,
  );

// ✅ GET, PUT, DELETE user by ID (you can add validation later if needed)
router.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default router;
