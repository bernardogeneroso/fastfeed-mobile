import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import AuthenticateUserService from "../services/AuthenticateUserService";

class SessionsController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return resp.status(202).json({
      user: classToClass(user),
      token,
    });
  }
}

export default SessionsController;
