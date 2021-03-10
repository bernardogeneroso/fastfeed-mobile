import User from "../typeorm/entity/User";
import IUser from "../schemas/IUser";

interface ICoursesRepository {
  findAll(): Promise<User[] | undefined>;
  create(data: IUser): Promise<User>;
  delete(id: string): Promise<void>;
}

export default ICoursesRepository;
