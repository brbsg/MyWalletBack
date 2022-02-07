import { Router } from "express";
import {
  statements,
  newEntry,
  deleteStatement,
  updateStatement,
} from "../controllers/statementsController.js";
import statementsMiddleware from "../middlewares/statementsMiddleware.js";

const statementsRouter = Router();

statementsRouter.get("/statements/:id", statements);
statementsRouter.put("/statements/:id", updateStatement);
statementsRouter.delete("/statements/:id", deleteStatement);
statementsRouter.post("/new-entry", statementsMiddleware, newEntry);

export default statementsRouter;
