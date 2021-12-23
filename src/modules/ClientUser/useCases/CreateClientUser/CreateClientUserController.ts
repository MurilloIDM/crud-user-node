import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClientUser } from "./CreateClientUser";

export class CreateClientUserController {
  
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { username, password, firstName, lastName } = request.body;

    const createClientUser = container.resolve(CreateClientUser);

    await createClientUser.execute({ username, password, firstName, lastName });

    return response.status(201).send();
  }
  
}
