import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import UsersRepository from "../../modules/users/typeorm/repositories/UserRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
