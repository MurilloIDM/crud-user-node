import { Router } from "express";

import { clientUserRouter } from "@routes/clientUser.routes";

const router = Router();

router.use("/client-user", clientUserRouter);

export default router;
