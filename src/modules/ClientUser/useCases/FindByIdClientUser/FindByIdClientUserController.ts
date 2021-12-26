import { ClientUser } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdClientUser } from "./FindByIdClientUser";

export class FindByIdClientUserController {
  async handle(request: Request, response: Response): Promise<Response<ClientUser>> {
    const { id } = request.params;

    const findByIdClientUser = container.resolve(FindByIdClientUser);

    const clientUser = await findByIdClientUser.execute(id);

    return response.json(clientUser);
  }
}
