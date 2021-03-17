export default interface IDelivery {
  product: string;
  address: string;
  postal_code: string;
  city: string;
  state: "Waiting" | "Pickup" | "Delivered";
  deliveryman_id: string;
  canceled_at?: Date;
  signature_id?: string;
  start_date?: Date;
  end_date?: Date;
}
