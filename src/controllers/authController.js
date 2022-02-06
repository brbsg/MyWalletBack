import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const dbUser = await db.collection("users").findOne({ email });

  if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
    const token = uuid();

    await db.collection("sessions").insertOne({
      userId: dbUser._id,
      token,
    });

    res.send(token).status(201);
  } else {
    res.sendStatus(401);
  }
}
