import { injectable, inject } from "tsyringe";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";

interface IRequest {
  id: string;
  date: Date;
  deliveryman_id: string;
}

@injectable()
class PickupDeliveryService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute({
    id,
    date,
    deliveryman_id,
  }: IRequest): Promise<Delivery | undefined> {
    const delivery = await this.deliveriesRepository.deliveredDate(
      id,
      date,
      deliveryman_id
    );

    return delivery;
  }
}

export default PickupDeliveryService;
