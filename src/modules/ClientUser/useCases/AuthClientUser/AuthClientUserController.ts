import { AuthResponse } from "@modules/ClientUser/dtos/AuthDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthClientUser } from "./AuthClientUser";

export class AuthClientUserController {
  async handle(request: Request, response: Response): Promise<Response<AuthResponse>> {
    const { username, password } = request.body;

    const authClientUser = container.resolve(AuthClientUser);

    const tokenResponse = await authClientUser.execute({ username, password });

    return response.json(tokenResponse);
  }
}
