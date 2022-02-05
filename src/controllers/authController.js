import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signIn(req, res) {
  console.log(req.body);

  res.sendStatus(200);
}
