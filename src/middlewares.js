import sharp from "sharp";
import path from "path";

const createThumbnail = async (req, res, next) => {
  try {
    // if file not uploeaded succsessfully
    if (!req.file) {
      // if file uploeaded succsessfully
      return next();
    }

    console.log("Creating thumbnail for:", req.file.path);

    // make new path for the new file
    const { path: filePath, filename } = req.file;
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const thumbPath = path.join("uploads", `${baseName}_thumb.png`);

    //make image PNG (160x160)
    await sharp(filePath).resize(160, 160).png().toFile(thumbPath);

    console.log("Thumbnail created:", thumbPath);
    next();
  } catch (err) {
    console.error("Error creating thumbnail:", err);
    next(err);
  }
};

export { createThumbnail };
