import sharp from "sharp";
import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { validationResult } from "express-validator";
import multer from "multer";
import "dotenv/config";

// ✅ Thumbnail Creator
const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) return next();

    console.log("Creating thumbnail for:", req.file.path);

    const { path: filePath, filename } = req.file;
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const thumbPath = path.join("uploads", `${baseName}_thumb.png`);

    await sharp(filePath).resize(160, 160).png().toFile(thumbPath);

    console.log("Thumbnail created:", thumbPath);
    next();
  } catch (err) {
    console.error("Error creating thumbnail:", err);
    next(err);
  }
};

// ✅ Validation middleware
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((e) => `${e.path}: ${e.msg}`)
      .join(", ");
    const error = new Error(messages);
    error.status = 400;
    return next(error);
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({ message: "invalid token" });
  }
};

// ✅ File upload validation
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      const error = new Error("Only images and videos are allowed!");
      error.status = 400;
      cb(error, false);
    }
  },
});

// ✅ Not found
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// ✅ Error handler
const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
  next();
};

export {
  createThumbnail,
  validationErrors,
  authenticateToken,
  upload,
  notFoundHandler,
  errorHandler,
};
