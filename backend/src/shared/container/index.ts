import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import UsersRepository from "../../modules/users/typeorm/repositories/UserRepository";

import IDeliveriesRepository from "../../modules/deliveries/repositories/IDeliveriesRepository";
import DeliveryRepository from "../../modules/deliveries/typeorm/repositories/DeliveryRepository";

import IHashProvider from "../../modules/users/providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "../../modules/users/providers/HashProvider/implementations/BCryptHashProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IDeliveriesRepository>(
  "DeliveriesRepository",
  DeliveryRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
