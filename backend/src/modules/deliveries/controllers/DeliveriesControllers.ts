import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowDeliveriesService from "../services/ShowDeliveriesService";
import CreateDeliveryService from "../services/CreateDeliveryService";
import DeleteDeliveryService from "../services/DeleteDeliveryService";
import PickupDeliveryService from "../services/PickupDeliveryService";
import DeliveredDeliveryService from "../services/DeliveredDeliveryService";
import DeliveredService from "../services/DeliveredService";

class DeliveriesControllers {
  public async index(req: Request, resp: Response): Promise<Response> {
    const { deliveryman_id } = req.params;
    const { search } = req.query;

    const showDeliveriesService = container.resolve(ShowDeliveriesService);

    const deliveries = await showDeliveriesService.execute({
      deliveryman_id,
      search: search ? search.toString() : "",
    });

    return resp.status(200).json(deliveries);
  }

  public async delivereds(req: Request, resp: Response): Promise<Response> {
    const { deliveryman_id } = req.params;
    const { search } = req.query;

    const deliveredService = container.resolve(DeliveredService);

    const deliveriesDelivired = await deliveredService.execute({
      deliveryman_id,
      search: search ? search.toString() : "",
    });

    return resp.status(200).json(deliveriesDelivired);
  }

  public async pickup(req: Request, resp: Response): Promise<Response> {
    const { id, date } = req.body;
    // @ts-ignore
    const user_id = req.user.id;

    const pickupDeliveryService = container.resolve(PickupDeliveryService);

    const delivery = await pickupDeliveryService.execute({
      id,
      date,
      deliveryman_id: user_id,
    });

    return resp.status(200).json(delivery);
  }

  public async delivered(req: Request, resp: Response): Promise<Response> {
    const { id, date } = req.body;
    // @ts-ignore
    const user_id = req.user.id;

    const deliveredDeliveryService = container.resolve(
      DeliveredDeliveryService
    );

    const delivery = await deliveredDeliveryService.execute({
      id,
      date,
      deliveryman_id: user_id,
    });

    return resp.status(200).json(delivery);
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const {
      product,
      address,
      postal_code,
      city,
      state,
      deliveryman_id,
    } = req.body;

    const createDeliveryService = container.resolve(CreateDeliveryService);

    const delivery = await createDeliveryService.execute({
      product,
      address,
      postal_code,
      city,
      state,
      deliveryman_id,
    });

    return resp.status(201).send(delivery);
  }

  public async delete(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const deleteDeliveryService = container.resolve(DeleteDeliveryService);

    await deleteDeliveryService.execute({ id });

    return resp.status(200).send();
  }
}

export default DeliveriesControllers;
