import { ClientUser } from "@prisma/client";
import { ClientUserDTO } from "../dto/ClientUserDTO";

export interface IClientUserRepository {
  create(clientUserDTO: ClientUserDTO): Promise<void>;
  update(id: string, clientUserDTO: ClientUserDTO): Promise<void>;
  findAll(): Promise<ClientUser[]>;
  findById(id: string): Promise<ClientUser>;
  delete(id: string): Promise<void>;
}
