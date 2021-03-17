import { injectable, inject } from "tsyringe";

import IDeliveriesRepository from "../repositories/IDeliveriesRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class DeleteDeliveryService {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.deliveriesRepository.delete(id);
  }
}

export default DeleteDeliveryService;
