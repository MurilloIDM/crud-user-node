import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUser } from "@prisma/client";
import { HttpException } from "exceptions/HttpException";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) {}

  async execute(id: string): Promise<ClientUser> {
    const clientUser = await this.clientUserRepository.findById(id);

    if (!clientUser) {
      throw new HttpException("ClientUser not found with this ID!", 404);
    }

    return clientUser;
  }
}
