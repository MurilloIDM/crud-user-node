import { Router } from "express";

import { clientUserRouter } from "infra/http/routes/clientUser.routes";
import { authRouter } from "./auth.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/client-user", clientUserRouter);

export default router;
