import { AuthClientUserController } from "@modules/ClientUser/useCases/AuthClientUser/AuthClientUserController";
import { Router } from "express";

const authRouter = Router();

const authClientUserController = new AuthClientUserController();

authRouter.post("/login", authClientUserController.handle);

export { authRouter };