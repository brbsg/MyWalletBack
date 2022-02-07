import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function statements(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(401);

    const dbUser = await db.collection("users").findOne({
      _id: session.userId,
    });

    if (dbUser) {
      const statements = await db
        .collection("statements")
        .find({
          idUser: new ObjectId(req.params.id),
        })
        .toArray();

      res.send(statements).status(201);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function newEntry(req, res) {
  const { value, description } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(401);

    const dbUser = await db.collection("users").findOne({
      _id: session.userId,
    });

    if (dbUser) {
      await db.collection("statements").insertOne({
        idUser: dbUser._id,
        value,
        description,
        date: dayjs().locale("pt-br").format("DD/MM/YY"),
      });

      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {}
}
