import { injectable, inject } from "tsyringe";
import { getHours, parseISO } from "date-fns";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  id: string;
  date: string;
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
    const deliveriesToday = await this.deliveriesRepository.findDeliversToday(
      deliveryman_id
    );

    if (deliveriesToday?.length === 5)
      throw new AppError("Error, can only pick up 5 packages for day", 403);

    const dateReceived = parseISO(date);
    const hour = getHours(dateReceived);

    if (hour < 8 || hour > 12)
      throw new AppError("You can only picker between 8:00 and 12:00", 403);

    const delivery = await this.deliveriesRepository.pickupDate(
      id,
      dateReceived,
      deliveryman_id
    );

    return delivery;
  }
}

export default PickupDeliveryService;
