import { AuthDTO, AuthResponse } from "@modules/ClientUser/dtos/AuthDTO";
import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { compare } from "bcrypt";
import { HttpException } from "exceptions/HttpException";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthClientUser {
  private secretToken: string;

  constructor(
    @inject("ClientUserRepository")
    private readonly clientUserRepository: IClientUserRepository
  ) {
    this.secretToken = process.env.SECRET_TOKEN;
  }

  async execute({ username, password }: AuthDTO): Promise<AuthResponse> {
    const clientUser = await this.clientUserRepository.findByUsername(username);

    if (!clientUser) {
      throw new HttpException("Invalid username or password!");
    }

    const validPassword = compare(password, clientUser.password);

    if (!validPassword) {
      throw new HttpException("Invalid username or password!");
    }

    const subjectForToken = clientUser.id; 
    const usernameForToken = clientUser.username;

    const token = sign(
      { username: usernameForToken },
      this.secretToken,
      { subject: subjectForToken }
    );

    return {
      access_token: token,
    } as AuthResponse;
  }
}
