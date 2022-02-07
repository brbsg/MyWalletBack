import { Router } from "express";
import { statements, newEntry } from "../controllers/statementsController.js";
import statementsMiddleware from "../middlewares/statementsMiddleware.js";

const statementsRouter = Router();

statementsRouter.get("/statements/:id", statements);
statementsRouter.post("/new-entry", statementsMiddleware, newEntry);

export default statementsRouter;
