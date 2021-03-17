import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "../../../users/typeorm/entity/User";

@Entity("deliveries")
export default class Delivery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  product: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column({
    type: "enum",
    enum: ["Waiting", "Pickup", "Delivered"],
    default: "Waiting",
  })
  state: "Waiting" | "Pickup" | "Delivered";

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "deliveryman_id" })
  user: User;

  @Column({ nullable: true })
  canceled_at: Date;

  @Column({ nullable: true })
  signature_id: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
