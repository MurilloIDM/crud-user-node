import { Router } from "express";
import { CreateClientUserController } from "@modules/ClientUser/useCases/CreateClientUser/CreateClientUserController";

const clientUserRouter = Router();

const createClientUserController = new CreateClientUserController();

clientUserRouter.post("/", createClientUserController.handle);

export { clientUserRouter };
