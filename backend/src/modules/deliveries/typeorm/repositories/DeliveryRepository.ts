import { getRepository, IsNull, Not, Raw, Repository } from "typeorm";
import { format, parseISO } from "date-fns";

import IDeliveriesRepository from "../../repositories/IDeliveriesRepository";
import Delivery from "../entity/Delivery";
import IDelivery from "../../schemas/IDelivery";
import AppError from "../../../../shared/errors/AppError";

class DeliveryRepository implements IDeliveriesRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async findAll(
    deliveryman_id: string
  ): Promise<Delivery[] | undefined> {
    try {
      return await this.ormRepository.find({
        cache: true,
        where: { deliveryman_id, end_date: IsNull() },
      });
    } catch {
      throw new AppError("Error on get deliveries of deliveryman");
    }
  }

  public async findOne(id: string): Promise<Delivery | undefined> {
    try {
      return await this.ormRepository.findOne({ id });
    } catch {
      throw new AppError("Error on get delivery");
    }
  }

  public async findDeliversToday(
    deliveryman_id: string
  ): Promise<Delivery[] | undefined> {
    try {
      const dateNow = new Date();

      return await this.ormRepository.find({
        deliveryman_id,
        start_date: Raw(
          (date) =>
            `to_char(${date}, 'DD-MM-YYYY') = '${format(
              dateNow,
              "dd-MM-yyyy"
            )}'`
        ),
      });
    } catch {
      throw new AppError("Error on get delivers of deliveryman today");
    }
  }

  public async findDelivered(
    deliveryman_id: string
  ): Promise<Delivery[] | undefined> {
    try {
      return await this.ormRepository.find({
        deliveryman_id,
        end_date: Not(IsNull()),
      });
    } catch {
      throw new AppError("Error on find delivereds");
    }
  }

  public async pickupDate(
    id: string,
    date: Date,
    deliveryman_id: string
  ): Promise<Delivery | undefined> {
    try {
      await this.ormRepository
        .createQueryBuilder()
        .update()
        .set({
          start_date: date,
        })
        .where("id = :id", { id })
        .andWhere("deliveryman_id = :deliveryman_id", { deliveryman_id })
        .execute();

      return await this.ormRepository.findOne({ id });
    } catch {
      throw new AppError("Error on add pickup date");
    }
  }

  public async deliveredDate(
    id: string,
    date: Date,
    deliveryman_id: string
  ): Promise<void> {
    try {
      await this.ormRepository
        .createQueryBuilder()
        .update()
        .set({
          end_date: date,
        })
        .where("id = :id", { id })
        .andWhere("deliveryman_id = :deliveryman_id", { deliveryman_id })
        .execute();
    } catch {
      throw new AppError("Error on add delivery date");
    }
  }

  public async create(data: IDelivery): Promise<Delivery> {
    try {
      const deliveryCreate = this.ormRepository.create(data);

      return await this.ormRepository.save(deliveryCreate);
    } catch {
      throw new AppError("Error on create delivery");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete({ id });

      return;
    } catch {
      throw new AppError("Error on delete delivery");
    }
  }
}

export default DeliveryRepository;
