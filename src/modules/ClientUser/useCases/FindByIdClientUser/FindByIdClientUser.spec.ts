import { v4 as uuidV4 } from "uuid";

import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUserRepositoryInMemory } from "@modules/ClientUser/repositories/in-memory/ClientUserRepositoryInMemory";
import { CreateClientUser } from "../CreateClientUser/CreateClientUser";
import { FindByIdClientUser } from "./FindByIdClientUser";
import { HttpException } from "../../../../exceptions/HttpException";

let createClientUser: CreateClientUser;
let findByIdClientUser: FindByIdClientUser;
let clientUserRepository: IClientUserRepository;

describe("Find By Id Client User", () => {
  beforeEach(() => {
    clientUserRepository = new ClientUserRepositoryInMemory();
    createClientUser = new CreateClientUser(clientUserRepository);
    findByIdClientUser = new FindByIdClientUser(clientUserRepository);
  });

  it("should be able to client user find by id", async () => {
    const clientUser = {
      username: "user.test",
      password: "test.1234",
      firstName: "testName",
      lastName: "testLast",
    };

    await createClientUser.execute(clientUser);

    const clientUserCreated = await clientUserRepository.findByUsername(clientUser.username);
    const clientUserExiting = await findByIdClientUser.execute(clientUserCreated.id);

    expect(clientUserExiting).toEqual(clientUserCreated);
  });

  it("should not be avle to client user find by id with id invalid", () => {
    const id = uuidV4();

    const execute = async () => {
      await findByIdClientUser.execute(id);
    };

    expect(execute).rejects.toBeInstanceOf(HttpException);
    expect(execute).rejects.toEqual({
      statusCode: 404,
      message: "ClientUser not found with this ID!",
    });
  })
})