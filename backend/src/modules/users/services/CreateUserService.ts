import { injectable, inject } from "tsyringe";

import User from "../typeorm/entity/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  image: string;
  password: string;
  deliveryman: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("HashProvider") private hashProvider: IHashProvider
  ) {}

  public async execute(data: IRequest): Promise<User | undefined> {
    const { email, password } = data;

    const isAlreadyRegistered = await this.usersRepository.findByEmail(email);

    if (isAlreadyRegistered) throw new AppError("Email address already used.");

    const hashedPass = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPass,
    });

    return user;
  }
}

export default CreateUserService;
