import { ClientUser, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { ClientUserDTO } from "../../dtos/ClientUserDTO";
import { IClientUserRepository } from "../IClientUserRepository";

export class ClientUserRepository implements IClientUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create({
    username,
    password,
    firstName,
    lastName,
  }: ClientUserDTO): Promise<void> {
    await this.prisma.clientUser.create({
      data: {
        username,
        password,
        firstName,
        lastName,
      }
    });
  }

  async update(id: string, {
    username,
    password,
    firstName,
    lastName,
  }: ClientUserDTO): Promise<void> {
    await this.prisma.clientUser.update({
      where: { id },
      data: {
        username,
        password,
        firstName,
        lastName,
      }
    });
  }

  async findAll(): Promise<ClientUser[]> {
    const clientsUsers = await this.prisma.clientUser.findMany();
    return clientsUsers;
  }

  async findById(id: string): Promise<ClientUser> {
    const clientUser = await this.prisma.clientUser.findUnique({
      where: { id }
    });
    return clientUser;
  }

  async findByUsername(username: string): Promise<ClientUser> {
    const clientUser = await this.prisma.clientUser.findFirst({
      where: { username }
    });
    return clientUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.clientUser.delete({ where: { id } });
  }

}