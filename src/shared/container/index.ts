import { container } from "tsyringe";

import { IClientUserRepository } from "@modules/ClientUser/repositories/IClientUserRepository";
import { ClientUserRepository } from "@modules/ClientUser/repositories/implementation/ClientUserRepository";

container.registerSingleton<IClientUserRepository>(
  "ClientUserRepository",
  ClientUserRepository
);