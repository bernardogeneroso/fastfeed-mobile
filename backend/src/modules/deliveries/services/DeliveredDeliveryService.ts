import { injectable, inject } from "tsyringe";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";
import AppError from "../../../shared/errors/AppError";

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
    const deliveryVerify = await this.deliveriesRepository.findOne(id);

    if (!deliveryVerify?.start_date)
      throw new AppError("Error, first you need to pickup the package", 403);

    await this.deliveriesRepository.deliveredDate(id, date, deliveryman_id);

    return {
      ...deliveryVerify,
      end_date: date,
    };
  }
}

export default PickupDeliveryService;
