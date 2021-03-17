import express from "express";

import usersRoutes from "../../modules/users/routes/users.routes";
import deliveriesRoutes from "../../modules/deliveries/routes/deliveries.routes";
import ensureAuthenticated from "../../modules/users/middlewares/ensureAuthenticated";

const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/delivers", ensureAuthenticated, deliveriesRoutes);

export default routes;
