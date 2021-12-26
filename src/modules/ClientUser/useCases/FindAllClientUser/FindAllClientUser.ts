import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUser } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) {}

  async execute(): Promise<ClientUser[]> {
    const listClientUser = await this.clientUserRepository.findAll();

    return listClientUser;
  }
}
