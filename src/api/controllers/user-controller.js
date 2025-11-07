import { listAllUsers, findUserById, addUser } from "../models/user-model.js";
import bcrypt from "bcrypt";

const getUser = (req, res) => res.json(listAllUsers());

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  user ? res.json(user) : res.sendStatus(404);
};

const postUser = (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); // sending Hashed passowrd to databass

    const newId = addUser(req.body);
    res.status(201).json({ message: "New user added.", user_id: newId });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const putUser = (req, res) => res.json({ message: "User item updated." });

const deleteUser = (req, res) => res.json({ message: "User item deleted." });

export { getUser, getUserById, postUser, putUser, deleteUser };
