import { injectable, inject } from "tsyringe";

import User from "../typeorm/entity/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  deliveryman: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  public async execute(data: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.create({
      ...data,
      image: "clean",
    });

    return user;
  }
}

export default CreateUserService;
