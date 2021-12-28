import { ClientUserRepository } from "@modules/ClientUser/repositories/implementation/ClientUserRepository";
import { HttpException } from "exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ResponseValidToken {
  sub: string;
  username: string;
}

export const EnsureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new HttpException("Unauthorized access!", 401);
  }

  const [prefix,token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    throw new HttpException("Unauthorized access!", 401);
  }

  try {
    const SECRET = process.env.SECRET_TOKEN;
    const { username, sub } = verify(token, SECRET) as ResponseValidToken;

    const clientUserRepository = new ClientUserRepository();
    const clientUser = await clientUserRepository.findByUsername(username);

    if (!clientUser) {
      throw new HttpException("Invalid token!", 403);
    }

    const user = {
      id: sub,
      username,
    };

    request.user = user;

    next();
  } catch (err) {
    throw new HttpException("Invalid token!", 403);
  }
}