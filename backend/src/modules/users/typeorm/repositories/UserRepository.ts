import { getRepository, Repository } from "typeorm";

import IUsersRepository from "../../repositories/IUsersRepository";
import User from "../entity/User";
import IUser from "../../schemas/IUser";
import AppError from "../../../../shared/errors/AppError";

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[] | undefined> {
    try {
      return await this.ormRepository.find({
        cache: true,
      });
    } catch {
      throw new AppError("Error on get users");
    }
  }

  public async findUserImage(id: string): Promise<string> {
    try {
      const imageUser = await this.ormRepository.findOne({
        cache: true,
        where: { id },
        select: ["image"],
      });

      if (!imageUser?.image)
        throw new AppError("Error, user image not found", 404);

      return imageUser.image;
    } catch {
      throw new AppError("Error on finding the user", 404);
    }
  }

  public async create(data: IUser): Promise<User> {
    try {
      const userCreate = this.ormRepository.create(data);

      return await this.ormRepository.save(userCreate);
    } catch {
      throw new AppError("Error on create user");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete({ id });

      return;
    } catch {
      throw new AppError("Error on delete user");
    }
  }
}

export default UserRepository;
