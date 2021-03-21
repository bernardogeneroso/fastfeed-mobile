import Delivery from "../typeorm/entity/Delivery";
import IDelivery from "../schemas/IDelivery";

interface IDeliveriesRepository {
  findAll(
    deliveryman_id: string,
    search: string
  ): Promise<Delivery[] | undefined>;
  findOne(id: string): Promise<Delivery | undefined>;
  findDeliversToday(deliveryman_id: string): Promise<Delivery[] | undefined>;
  findDelivered(
    deliveryman_id: string,
    search: string
  ): Promise<Delivery[] | undefined>;
  pickupDate(
    id: string,
    pickupDate: Date,
    deliveryman_id: string
  ): Promise<Delivery | undefined>;
  deliveredDate(
    id: string,
    pickupDate: Date,
    deliveryman_id: string
  ): Promise<void>;
  create(data: IDelivery): Promise<Delivery>;
  delete(id: string): Promise<void>;
}

export default IDeliveriesRepository;
