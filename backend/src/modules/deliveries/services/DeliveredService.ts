import { injectable, inject } from "tsyringe";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";

interface IRequest {
  deliveryman_id: string;
}

@injectable()
class DeliveredService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute({
    deliveryman_id,
  }: IRequest): Promise<Delivery[] | undefined> {
    const deliveriesDelivered = await this.deliveriesRepository.findDelivered(
      deliveryman_id
    );

    return deliveriesDelivered;
  }
}

export default DeliveredService;
