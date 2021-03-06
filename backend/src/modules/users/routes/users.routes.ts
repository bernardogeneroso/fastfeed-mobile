import express from "express";
import multer from "multer";
import path from "path";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAdmin from "../middlewares/ensureAdmin";

import UsersController from "../controllers/UsersController";
import SessionsController from "../controllers/SessionsController";
import uploadConfig from "../../../config/multer";

const usersRoutes = express.Router();

const upload = multer(uploadConfig.multerStorageUsersAvatars);

const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRoutes.get("/", ensureAdmin, usersController.index);
usersRoutes.post(
  "/",
  ensureAdmin,
  upload.single("image"),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      deliveryman: Joi.string().required(),
    },
  }),
  usersController.create
);
usersRoutes.post(
  "/session",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);
usersRoutes.delete("/:id", ensureAdmin, usersController.delete);

usersRoutes.use(
  "/image",
  express.static(path.resolve(uploadConfig.uploadsFolder, "users"))
);

export default usersRoutes;
