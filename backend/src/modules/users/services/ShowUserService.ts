import { injectable, inject } from "tsyringe";

import User from "../typeorm/entity/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class ShowUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const user = await this.usersRepository.findAll();

    return user;
  }
}

export default ShowUserService;
