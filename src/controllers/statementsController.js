import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function updateStatement(req, res) {
  const { id } = req.params;
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

    const statement = await db
      .collection("statements")
      .findOne({ _id: new ObjectId(id) });

    if (!statement) return res.sendStatus(401);
    console.log(id);

    await db
      .collection("statements")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            idUser: dbUser._id,
            value,
            description,
            date: dayjs().locale("pt-br").format("DD/MM/YY"),
          },
        }
      )
      .then((res) => console.log(res))
      .catch((res) => console.log(res));

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(401);
  }
}

export async function deleteStatement(req, res) {
  const { id } = req.params;

  try {
    await db.collection("statements").deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(401);
  }
}

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
