import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { HttpException } from "../../../../exceptions/HttpException";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) { }

  async execute(id: string): Promise<void> {
    const clientUserAlreadyExists = await this.clientUserRepository.findById(id);

    if (!clientUserAlreadyExists) {
      throw new HttpException("ClientUser not found with this ID!", 404);
    }

    await this.clientUserRepository.delete(id);
  }
}
