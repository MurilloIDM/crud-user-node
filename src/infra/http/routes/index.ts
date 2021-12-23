import { Router } from "express";

import { clientUserRouter } from "infra/http/routes/clientUser.routes";

const router = Router();

router.use("/client-user", clientUserRouter);

export default router;
