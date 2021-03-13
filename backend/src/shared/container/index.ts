import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import UsersRepository from "../../modules/users/typeorm/repositories/UserRepository";

import IHashProvider from "../../modules/users/providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "../../modules/users/providers/HashProvider/implementations/BCryptHashProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
