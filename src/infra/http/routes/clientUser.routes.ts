import { Router } from "express";
import { CreateClientUserController } from "@modules/ClientUser/useCases/CreateClientUser/CreateClientUserController";
import { UpdateClientUserController } from "@modules/ClientUser/useCases/UpdateClientUser/UpdateClientUserController";
import { FindAllClientUserController } from "@modules/ClientUser/useCases/FindAllClientUser/FindAllClientUserController";

const clientUserRouter = Router();

const createClientUserController = new CreateClientUserController();
const updateClientUserController = new UpdateClientUserController();
const findAllClientUserController = new FindAllClientUserController();

clientUserRouter.post("/", createClientUserController.handle);
clientUserRouter.put("/:id", updateClientUserController.handle);
clientUserRouter.get("/", findAllClientUserController.handle);

export { clientUserRouter };
