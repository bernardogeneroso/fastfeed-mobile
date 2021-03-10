import express from "express";

import UserController from "../controllers/UserController";

const usersRoutes = express.Router();

const userController = new UserController();

usersRoutes.get("/", userController.index);
usersRoutes.post("/", userController.create);
usersRoutes.delete("/:id", userController.delete);

export default usersRoutes;
