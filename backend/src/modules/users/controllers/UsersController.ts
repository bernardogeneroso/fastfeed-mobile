import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ShowUserService from "../services/ShowUserService";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import AppError from "../../../shared/errors/AppError";

class UsersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);

    const users = await showUserService.execute();

    return resp.json(classToClass(users));
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email, password, deliveryman } = req.body;

    const createUserService = container.resolve(CreateUserService);

    try {
      const image = req.file.filename;

      const user = await createUserService.execute({
        name,
        email,
        password,
        deliveryman,
        image,
      });

      return resp.status(201).json(classToClass(user));
    } catch {
      throw new AppError("Image not found!", 400);
    }
  }

  public async delete(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(id);

    return resp.status(200).send();
  }
}

export default UsersController;
