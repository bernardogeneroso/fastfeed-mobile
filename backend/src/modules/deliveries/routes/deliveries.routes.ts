import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import DeliveriesControllers from "../controllers/DeliveriesControllers";
import validation from "../utils/validation";

const deliveriesRouter = Router();

const deliveriesControllers = new DeliveriesControllers();

deliveriesRouter.get(
  "/:deliveryman_id",
  celebrate({
    [Segments.PARAMS]: {
      deliveryman_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      search: Joi.string(),
    },
  }),
  deliveriesControllers.index
);
deliveriesRouter.get(
  "/delivered/:deliveryman_id",
  celebrate({
    [Segments.PARAMS]: {
      deliveryman_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      search: Joi.string(),
    },
  }),
  deliveriesControllers.delivereds
);
deliveriesRouter.patch(
  "/pickup",
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  deliveriesControllers.pickup
);
deliveriesRouter.patch(
  "/delivered",
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  deliveriesControllers.delivered
);
deliveriesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      address: Joi.string().required(),
      postal_code: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required().custom(validation),
      deliveryman_id: Joi.string().required(),
    },
  }),
  deliveriesControllers.create
);
deliveriesRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deliveriesControllers.delete
);

export default deliveriesRouter;
