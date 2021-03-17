import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { verify } from "jsonwebtoken";

import User from "../typeorm/entity/User";
import authConfig from "../../../config/auth";
import AppError from "../../../shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("JWT token is missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: user_id } = decoded as ITokenPayload;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: user_id });

    if (!user) throw new Error();

    if (user.deliveryman === 1) throw new Error();

    // @ts-ignore
    request.user = { id: user_id };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
};

export default ensureAdmin;
