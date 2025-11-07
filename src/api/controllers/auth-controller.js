import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByUsername } from "../models/user-model.js";
import "dotenv/config";

const postLogin = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  const user = await getUserByUsername(req.body.username);

  if (!user) return res.sendStatus(401);

  if (!bcrypt.compareSync(req.body.password, user.password))
    return res.sendStatus(401);

  // Remove password
  const userSafe = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userSafe, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ user: userSafe, token });
};

const getMe = async (req, res) => {
  if (res.locals.user) {
    return res.json({ message: "token ok", user: res.locals.user });
  }
  res.sendStatus(401);
};

export { postLogin, getMe };
