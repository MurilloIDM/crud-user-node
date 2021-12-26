import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClientUser } from "./DeleteClientUser";

export class DeleteClientUserController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;

    const deleteClientUser = container.resolve(DeleteClientUser);

    await deleteClientUser.execute(id);

    return response.send();
  }
}
