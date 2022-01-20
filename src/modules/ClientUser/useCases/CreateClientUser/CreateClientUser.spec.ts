import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUserRepositoryInMemory } from "@modules/ClientUser/repositories/in-memory/ClientUserRepositoryInMemory";
import { compare } from "bcrypt";
import { HttpException } from "../../../../exceptions/HttpException";
import { CreateClientUser } from "./CreateClientUser";

let createClientUser: CreateClientUser;
let clientUserRepository: IClientUserRepository;

describe("Create Client User", () => {
  beforeEach(() => {
    clientUserRepository = new ClientUserRepositoryInMemory();
    createClientUser = new CreateClientUser(clientUserRepository);
  });

  it("should be able to create a client user", async () => {
    const clientUser = {
      username: "test.user",
      password: "password@test",
      firstName: "testName",
      lastName: "testLast",
    };

    await createClientUser.execute(clientUser);

    const clientUserCreated = await clientUserRepository.findByUsername(clientUser.username);

    expect(clientUserCreated).toHaveProperty("id");
  });

  it("should not be able to create a client user with username existing", async () => {
    const execute = async () => {
      const clientUser = {
        username: "test.user",
        password: "password@test",
        firstName: "testName",
        lastName: "testLast",
      };

      await createClientUser.execute(clientUser);
      await createClientUser.execute(clientUser);
    };

    expect(async () => await execute()).rejects.toBeInstanceOf(HttpException);
    expect(async () => await execute()).rejects.toEqual({
      statusCode: 400,
      message: "ClientUser already exists with username!",
    });
  });

  it("Should be able to create a client user with password encrypted", async () => {
    const clientUser = {
      username: "test.user",
      password: "password@test",
      firstName: "testName",
      lastName: "testLast",
    };

    await createClientUser.execute(clientUser);

    const clientUserCreated = await clientUserRepository.findByUsername(clientUser.username);
    const validPassword = await compare(clientUser.password, clientUserCreated.password);

    expect(validPassword).toEqual(true);
  });
});