import { container } from "tsyringe";

import { IClientUserRepository } from "../../modules/ClientUser/repository/IClientUserRepository";
import { ClientUserRepository } from "../../modules/ClientUser/repository/implementation/ClientUserRepository";

container.registerSingleton<IClientUserRepository>(
  "ClientUserRepository",
  ClientUserRepository
);