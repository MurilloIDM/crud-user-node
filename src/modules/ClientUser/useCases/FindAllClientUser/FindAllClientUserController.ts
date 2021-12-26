import { ClientUser } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllClientUser } from "./FindAllClientUser";

export class FindAllClientUserController {
  async handle(request: Request, response: Response): Promise<Response<ClientUser[]>> {
    const findAllClientUser = container.resolve(FindAllClientUser);

    const listClientUser = await findAllClientUser.execute();

    if (!listClientUser.length) {
      return response.status(204).send();
    }

    return response.json(listClientUser);
  }
}
