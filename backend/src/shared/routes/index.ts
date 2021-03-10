import express from "express";

import usersRoutes from "../../modules/users/routes/users.routes";

const routes = express.Router();

routes.use("/users", usersRoutes);

export default routes;
