import { injectable, inject } from "tsyringe";

import Delivery from "../typeorm/entity/Delivery";
import IDeliveriesRepository from "../repositories/IDeliveriesRepository";

interface IRequest {
  product: string;
  address: string;
  postal_code: string;
  city: string;
  state: "Waiting" | "Pickup" | "Delivered";
  deliveryman_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute(data: IRequest): Promise<Delivery | undefined> {
    const { product, address, postal_code, city, state, deliveryman_id } = data;

    const delivery = await this.deliveriesRepository.create({
      product,
      address,
      postal_code,
      city,
      state,
      deliveryman_id,
    });

    return delivery;
  }
}

export default CreateUserService;
