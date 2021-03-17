import { injectable, inject } from "tsyringe";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";

interface IRequest {
  deliveryman_id: string;
}

@injectable()
class ShowDeliveriesService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute({
    deliveryman_id,
  }: IRequest): Promise<Delivery[] | undefined> {
    const deliveries = await this.deliveriesRepository.findAll(deliveryman_id);

    return deliveries;
  }
}

export default ShowDeliveriesService;
