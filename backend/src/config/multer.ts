import path from "path";
import crypto from "crypto";
import multer, { StorageEngine } from "multer";

const uploadsFolder = path.resolve(__dirname, "..", "..", "uploads");

interface IUploadConfig {
  uploadsFolder: string;

  multerStorageUsersAvatars: {
    storage: StorageEngine;
  };

  multerStoragePackageSignature: {
    storage: StorageEngine;
  };
}

export default {
  uploadsFolder,

  multerStorageUsersAvatars: {
    storage: multer.diskStorage({
      destination: path.resolve(uploadsFolder, "users"),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  multerStoragePackageSignature: {
    storage: multer.diskStorage({
      destination: path.resolve(uploadsFolder, "package_signature"),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = fileHash;

        return callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
