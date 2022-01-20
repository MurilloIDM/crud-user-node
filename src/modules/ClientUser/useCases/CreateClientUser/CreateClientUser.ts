import { inject, injectable } from "tsyringe";
import { genSalt, hash } from "bcrypt";

import { ClientUserDTO } from "@modules/ClientUser/dtos/ClientUserDTO";
import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";

import { HttpException } from "../../../../exceptions/HttpException";

@injectable()
export class CreateClientUser {
  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) { }

  async execute({
    username,
    password,
    firstName,
    lastName,
  }: ClientUserDTO): Promise<void> {
    const clientUserAlreadyExists = await this.clientUserRepository.findByUsername(username);

    if (clientUserAlreadyExists) {
      throw new HttpException("ClientUser already exists with username!");
    }

    const saltHash = await genSalt(8);
    const passwordHash = await hash(password, saltHash);

    await this.clientUserRepository.create({
      username: username.toLowerCase(),
      password: passwordHash,
      firstName,
      lastName
    });
  }

}
