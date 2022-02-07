import { Router } from "express";
import {
  statements,
  newEntry,
  deleteStatement,
} from "../controllers/statementsController.js";
import statementsMiddleware from "../middlewares/statementsMiddleware.js";

const statementsRouter = Router();

statementsRouter.get("/statements/:id", statements);
statementsRouter.delete("/statements/:id", deleteStatement);
statementsRouter.post("/new-entry", statementsMiddleware, newEntry);

export default statementsRouter;
