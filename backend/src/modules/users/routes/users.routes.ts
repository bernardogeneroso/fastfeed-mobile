import express from "express";
import multer from "multer";
import path from "path";
import { celebrate, Segments, Joi } from "celebrate";

import UserController from "../controllers/UserController";
import uploadConfig from "../../../config/multer";

const usersRoutes = express.Router();

const upload = multer(uploadConfig.multerStorageUsersAvatars);

const userController = new UserController();

usersRoutes.get("/", userController.index);
usersRoutes.post(
  "/",
  upload.single("image"),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      deliveryman: Joi.string().required(),
    },
  }),
  userController.create
);
usersRoutes.delete("/:id", userController.delete);

usersRoutes.use(
  "/image",
  express.static(path.resolve(uploadConfig.uploadsFolder, "users"))
);

export default usersRoutes;
