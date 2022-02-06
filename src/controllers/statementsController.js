import bcrypt from "bcrypt";
import db from "../db.js";

export async function newEntry(req, res) {
  const { authorization } = req.header;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });

  if (!session) return res.sendStatus(401);

  const user = await db.collection("users").findOne({
    _id: session.userId,
  });

  if (user) {
  } else {
  }
}
