import express from "express";
import { body } from "express-validator";

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";

// Correct relative path to middlewares.js from src/api/routes/cat-routes.js
import {
  upload,
  validationErrors,
  createThumbnail,
  authenticateToken,
} from "../../middlewares.js";

const router = express.Router();

// Routes for all cats
router
  .route("/")
  .get(getCat)
  .post(
    authenticateToken,
    upload.single("file"), // file upload
    createThumbnail, // create thumbnail

    // Validation rules
    body("cat_name")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("cat_name must be between 3-50 characters"),
    body("weight").isFloat().withMessage("weight must be a number"),
    body("owner").isInt().withMessage("owner must be an integer"),
    body("birthdate").isDate().withMessage("birthdate must be a valid date"),

    validationErrors,
    postCat,
  );

// Routes for single cat by ID
router.route("/:id").get(getCatById).put(putCat).delete(deleteCat);

export default router;
