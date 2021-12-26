import { Router } from "express";
import { CreateClientUserController } from "@modules/ClientUser/useCases/CreateClientUser/CreateClientUserController";
import { UpdateClientUserController } from "@modules/ClientUser/useCases/UpdateClientUser/UpdateClientUserController";
import { FindAllClientUserController } from "@modules/ClientUser/useCases/FindAllClientUser/FindAllClientUserController";
import { FindByIdClientUserController } from "@modules/ClientUser/useCases/FindByIdClientUser/FindByIdClientUserController";

const clientUserRouter = Router();

const createClientUserController = new CreateClientUserController();
const updateClientUserController = new UpdateClientUserController();
const findAllClientUserController = new FindAllClientUserController();
const findByIdClientUserController = new FindByIdClientUserController();

clientUserRouter.post("/", createClientUserController.handle);
clientUserRouter.put("/:id", updateClientUserController.handle);
clientUserRouter.get("/", findAllClientUserController.handle);
clientUserRouter.get("/:id", findByIdClientUserController.handle);

export { clientUserRouter };
