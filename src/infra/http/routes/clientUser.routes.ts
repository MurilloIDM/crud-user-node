import { Router } from "express";
import { CreateClientUserController } from "@modules/ClientUser/useCases/CreateClientUser/CreateClientUserController";
import { UpdateClientUserController } from "@modules/ClientUser/useCases/UpdateClientUser/UpdateClientUserController";

const clientUserRouter = Router();

const createClientUserController = new CreateClientUserController();
const updateClientUserController = new UpdateClientUserController();

clientUserRouter.post("/", createClientUserController.handle);
clientUserRouter.put("/:id", updateClientUserController.handle);

export { clientUserRouter };
