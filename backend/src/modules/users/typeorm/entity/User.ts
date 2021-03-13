import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Expose, Exclude } from "class-transformer";

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
  @Column({ default: 0 })
  deliveryman: number = 0;

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

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() updated_at: Date;
}
