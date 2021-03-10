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
      return this.ormRepository.find({
        cache: true,
      });
    } catch {
      throw new AppError("Error on get users");
    }
  }

  public async create(data: IUser): Promise<User> {
    try {
      const userCreate = this.ormRepository.create(data);

      return await this.ormRepository.save(userCreate);
    } catch (err) {
      console.log(err);
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
