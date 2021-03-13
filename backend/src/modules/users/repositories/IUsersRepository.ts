import User from "../typeorm/entity/User";
import IUser from "../schemas/IUser";

interface IUsersRepository {
  findAll(): Promise<User[] | undefined>;
  findUserImage(id: string): Promise<string>;
  create(data: IUser): Promise<User>;
  delete(id: string): Promise<void>;
}

export default IUsersRepository;
