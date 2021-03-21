import { injectable, inject } from "tsyringe";
import { isSameDay } from "date-fns";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";

interface IRequest {
  deliveryman_id: string;
  search: string;
}

interface DeliveriesFormated {
  day: Date;
  deliveries: Delivery[];
}

@injectable()
class DeliveredService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute({
    deliveryman_id,
    search,
  }: IRequest): Promise<DeliveriesFormated[] | undefined> {
    const deliveriesDelivered = await this.deliveriesRepository.findDelivered(
      deliveryman_id,
      search
    );

    const deliveriesFormated: DeliveriesFormated[] = [];

    deliveriesDelivered?.map((deliverie: Delivery) => {
      const end_date = deliverie.end_date;

      const deliveriesIndex = deliveriesFormated.findIndex((deliverieFind) =>
        isSameDay(deliverieFind.day, end_date)
      );

      deliveriesIndex === -1
        ? deliveriesFormated.push({
            day: end_date,
            deliveries: [deliverie],
          })
        : (deliveriesFormated[deliveriesIndex].deliveries = [
            ...deliveriesFormated[deliveriesIndex].deliveries,
            deliverie,
          ]);
    });

    return deliveriesFormated;
  }
}

export default DeliveredService;
