import { ClientUserDTO } from "@modules/ClientUser/dtos/ClientUserDTO";
import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { genSalt, hash } from "bcrypt";
import { HttpException } from "exceptions/HttpException";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) {}

  async execute(id: string, {
    username,
    password,
    firstName,
    lastName,
  }: ClientUserDTO): Promise<void> {
    const clientUserAlreadyExistsWithId = await this.clientUserRepository.findById(id);

    if (!clientUserAlreadyExistsWithId) {
      throw new HttpException("UserClient not found with ID!");
    }

    const clientUserAlreadyExistsWithUsername = await this.clientUserRepository.findByUsername(username);

    if (
      clientUserAlreadyExistsWithUsername && clientUserAlreadyExistsWithUsername.id !== id
    ) {
      throw new HttpException("ClientUser already exists with username!");
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    await this.clientUserRepository.update(id, {
      username: username.toLowerCase(),
      password: passwordHash,
      firstName,
      lastName, 
    });
  }
}
