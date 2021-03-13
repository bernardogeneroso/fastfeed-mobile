import { injectable, inject } from "tsyringe";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import uploadConfig from "../../../config/multer";

import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../../../shared/errors/AppError";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const imageUser = await this.usersRepository.findUserImage(id);

    try {
      const filePath = path.resolve(
        uploadConfig.uploadsFolder,
        "users",
        imageUser
      );

      const unlinkAsyncCourseImage = promisify(fs.unlink);
      await unlinkAsyncCourseImage(filePath);
    } catch {
      throw new AppError("Error on delete user image");
    }

    await this.usersRepository.delete(id);

    return;
  }
}

export default DeleteUserService;
