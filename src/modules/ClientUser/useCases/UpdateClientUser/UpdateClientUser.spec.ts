import { v4 as uuidV4 } from "uuid";

import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUserRepositoryInMemory } from "@modules/ClientUser/repositories/in-memory/ClientUserRepositoryInMemory";
import { CreateClientUser } from "../CreateClientUser/CreateClientUser";
import { UpdateClientUser } from "./UpdateClientUser";
import { HttpException } from "../../../../exceptions/HttpException";

let updateClientUser: UpdateClientUser;
let createClientUser: CreateClientUser;
let clientUserRepository: IClientUserRepository;

describe("Update Client User", () => {
  beforeEach(() => {
    clientUserRepository = new ClientUserRepositoryInMemory();
    updateClientUser = new UpdateClientUser(clientUserRepository);
    createClientUser = new CreateClientUser(clientUserRepository);
  });

  it("should be able to update client user", async () => {
    const clientUser = {
      username: "user@test",
      password: "pass@1234",
      firstName: "TestName",
      lastName: "LastTest",
    };

    await createClientUser.execute(clientUser);

    const createdClientUser = await clientUserRepository.findByUsername(clientUser.username);

    const updateClientUserData = {
      username: "user_test",
      password: clientUser.password,
      firstName: clientUser.firstName,
      lastName: "LastnameTest",
    };

    await updateClientUser.execute(createdClientUser.id, updateClientUserData);

    const updatedClientUser = await clientUserRepository.findByUsername(updateClientUserData.username);

    expect(updatedClientUser.username).toEqual("user_test");
    expect(updatedClientUser.lastName).toEqual("LastnameTest");
  });

  it("should not be able to update client user with invalid id", async () => {
    const execute = async () => {
      const invalidId = uuidV4();
      const updateClientUserData = {
        username: "user_test",
        password: "pass@1234",
        firstName: "Testname",
        lastName: "LastnameTest",
      };

      await updateClientUser.execute(invalidId, updateClientUserData);
    }

    await expect(execute()).rejects.toBeInstanceOf(HttpException);
    await expect(execute()).rejects.toEqual({
      statusCode: 404,
      message: "UserClient not found with this ID!",
    });
  });

  it("should not be able to update client user with username existing", async () => {
    const execute = async () => {
      const clientUserOne = {
        username: "user_test_one",
        password: "pass@1234",
        firstName: "TestOne",
        lastName: "LastTestOne",
      };

      const clientUserTwo = {
        username: "user_test_two",
        password: "pass@1234",
        firstName: "TestTwo",
        lastName: "LastTestTwo",
      };

      await createClientUser.execute(clientUserOne);
      await createClientUser.execute(clientUserTwo);

      const createdClientUserTwo = await clientUserRepository.findByUsername(clientUserTwo.username);

      await updateClientUser.execute(createdClientUserTwo.id, {
        username: clientUserOne.username,
        password: clientUserTwo.password,
        firstName: clientUserTwo.firstName,
        lastName: clientUserTwo.lastName,
      });
    };

    await expect(execute()).rejects.toBeInstanceOf(HttpException);
    await expect(execute()).rejects.toEqual({
      statusCode: 400,
      message: "ClientUser already exists with username!",
    });
  });
});