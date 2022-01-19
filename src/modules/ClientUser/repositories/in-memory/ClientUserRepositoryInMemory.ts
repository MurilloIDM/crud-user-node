import { v4 as uuidV4 } from "uuid";

import { ClientUserDTO } from "@modules/ClientUser/dtos/ClientUserDTO";
import { ClientUser } from "@prisma/client";
import { IClientUserRepository } from "../IClientUserRepository";

export class ClientUserRepositoryInMemory implements IClientUserRepository {
  private clientUsers: ClientUser[];

  constructor() {
    this.clientUsers = [];
  }

  async create({
    username,
    password,
    firstName,
    lastName,
  }: ClientUserDTO): Promise<void> {
    const clientUser = {
      id: uuidV4(),
      username,
      password,
      firstName,
      lastName,
    };

    this.clientUsers.push(clientUser);
  }

  async update(id: string, clientUserDTO: ClientUserDTO): Promise<void> {
    const clientUserBeforeIndex = this.clientUsers.findIndex((clientUser) => clientUser.id === id);
    const clientUserBefore = this.clientUsers.find((clientUser) => clientUser.id === id);

    const clientUserUpdated = { ...clientUserBefore, ...clientUserDTO };

    this.clientUsers.splice(clientUserBeforeIndex, 0, clientUserUpdated);
  }

  async findAll(): Promise<ClientUser[]> {
    const clientUsers = this.clientUsers;
    return clientUsers;
  }

  async findById(id: string): Promise<ClientUser> {
    const clientUser = this.clientUsers.find((clientUser) => clientUser.id === id);
    return clientUser;
  }

  async findByUsername(username: string): Promise<ClientUser> {
    const clientUser = this.clientUsers.find((clientUser) => clientUser.username === username);
    return clientUser;
  }

  async delete(id: string): Promise<void> {
    const clientUserIndex = this.clientUsers.findIndex((clientUser) => clientUser.id === id);
    this.clientUsers.splice(clientUserIndex, 1);
  }

}