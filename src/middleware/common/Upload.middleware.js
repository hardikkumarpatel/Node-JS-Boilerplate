import multer, { MulterError } from "multer";
import path from "node:path";
import fs from "node:fs";

class UploadMiddleware {
  static MAX_SIZE = 1 * 1000 * 1000; /** 1MB */
  static storage = multer.diskStorage({
    destination(_req, file, callback) {
      const folder = file.mimetype.startsWith("image/") ? "image" : "pdf";
      const location = path.resolve("src", "upload", folder);
      if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
      }
      callback(null, location);
    },
    filename(_req, file, callback) {
      callback(null, Date.now() + "-" + file.originalname);
    }
  });

  static filter = (_req, file, callback) => {
    const FILES_EXT_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (FILES_EXT_TYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new MulterError(
          "INVALID_FILE_TYPE",
          `Invalid file type. Only ${FILES_EXT_TYPES.join(", ")} files are allowed`
        )
      );
    }
  };

  static upload = multer({
    storage: this.storage,
    limits: {
      fileSize: this.MAX_SIZE
    },
    fileFilter: this.filter
  });
}

export default UploadMiddleware;
