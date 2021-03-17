import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Expose, Exclude } from "class-transformer";

import Delivery from "../../../deliveries/typeorm/entity/Delivery";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  image: string;

  @Exclude()
  @Column({
    type: "enum",
    enum: [0, 1],
    default: 0,
  })
  deliveryman: 0 | 1;

  @Expose({ name: "deliveryman" })
  getComplete(): number | boolean | null {
    if (this.deliveryman === null) {
      return null;
    }

    return this.deliveryman === 1 ? true : false;
  }

  @Expose({ name: "image_url" })
  getImage_url(): string | null {
    if (!this.image) {
      return null;
    }

    return `${process.env.APP_API_URL}/users/image/${this.image}`;
  }

  @OneToMany(() => Delivery, (deliveries) => deliveries.deliveryman_id)
  deliveries: Delivery;

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() updated_at: Date;
}
