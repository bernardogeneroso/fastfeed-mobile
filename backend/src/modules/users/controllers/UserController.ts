import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ShowUserService from "../services/ShowUserService";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import AppError from "../../../shared/errors/AppError";

class UserController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);

    const users = await showUserService.execute();

    return resp.status(201).send(classToClass(users));
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const { name, email, password, deliveryman } = req.body;

    try {
      const image = req.file.filename;

      const user = await createUserService.execute({
        name,
        email,
        password,
        deliveryman,
        image,
      });

      return resp.status(201).send(classToClass(user));
    } catch {
      throw new AppError("Image not found!", 400);
    }
  }

  public async delete(req: Request, resp: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);

    const { id } = req.params;

    await deleteUserService.execute(id);

    return resp.status(200).send();
  }
}

export default UserController;
