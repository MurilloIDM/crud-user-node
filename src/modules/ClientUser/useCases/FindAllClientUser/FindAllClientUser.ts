import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUser } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../exceptions/HttpException";

@injectable()
export class FindAllClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) {}

  async execute(): Promise<ClientUser[]> {
    const listClientUser = await this.clientUserRepository.findAll();

    if (!listClientUser.length) {
      throw new HttpException("No Content", 204);
    }

    return listClientUser;
  }
}
