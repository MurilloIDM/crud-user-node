import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClientUser } from "./UpdateClientUser";

export class UpdateClientUserController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const { username, password, firstName, lastName } = request.body;

    const updateClientUser = container.resolve(UpdateClientUser);

    await updateClientUser.execute(id, {
      username,
      password,
      firstName,
      lastName,
    });

    return response.send();
  }
}
