import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUserRepositoryInMemory } from "@modules/ClientUser/repositories/in-memory/ClientUserRepositoryInMemory";
import { HttpException } from "../../../../exceptions/HttpException";
import { CreateClientUser } from "../CreateClientUser/CreateClientUser";
import { FindAllClientUser } from "./FindAllClientUser";

let createClientUser: CreateClientUser;
let findAllClientUser: FindAllClientUser;
let clientUserRepository: IClientUserRepository;

describe("Find All Client User", () => {
  beforeEach(() => {
    clientUserRepository = new ClientUserRepositoryInMemory();
    findAllClientUser = new FindAllClientUser(clientUserRepository);
    createClientUser = new CreateClientUser(clientUserRepository);
  });

  it("should be able find all client user", async () => {
    const clientUser = {
      username: "user@test",
      password: "test1234",
      firstName: "TestFirst",
      lastName: "TestLast",
    };

    await createClientUser.execute(clientUser);

    const allClientUsers = await findAllClientUser.execute();
    
    expect(allClientUsers).toHaveLength(1);
  });

  it("should not be able to find none client user", async () => {
    const execute = async () => {
      await findAllClientUser.execute();
    }

    await expect(execute()).rejects.toBeInstanceOf(HttpException);
    await expect(execute()).rejects.toEqual({
      statusCode: 204,
      message: "No Content",
    });
  })
});