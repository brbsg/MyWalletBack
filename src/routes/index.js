import { Router } from "express";
import authRouter from "./authRouter.js";
import statementsRouter from "./statementsRouter.js";

const router = Router();

router.use(authRouter);
router.use(statementsRouter);

export default router;
