import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    const dbUser = await db.collection("users").findOne({ email: user.email });

    if (dbUser) return res.sendStatus(401);

    await db.collection("users").insertOne({ ...user, password: passwordHash });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const dbUser = await db.collection("users").findOne({ email });
    const dbSession = await db
      .collection("sessions")
      .findOne({ userId: dbUser._id });

    if (dbSession) {
      await db
        .collection("sessions")
        .deleteMany({ userId: dbUser._id })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }

    if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        userId: dbUser._id,
        token,
      });

      res.send({ id: dbUser._id, name: dbUser.name, token }).status(201);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
}
