import { Router } from "express";
import { entries, newEntry } from "../controllers/statementsController.js";
import statementsMiddleware from "../middlewares/statementsMiddleware.js";

const statementsRouter = Router();

statementsRouter.get("/entries/:id", entries);
statementsRouter.post("/new-entry", statementsMiddleware, newEntry);

export default statementsRouter;
