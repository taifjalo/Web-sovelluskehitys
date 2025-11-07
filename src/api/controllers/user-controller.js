import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from "../models/user-model.js";

// GET all users
const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// POST new user
const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    if (!result) return res.status(400).json({ message: "User not added" });
    res.status(201).json({ message: "User added", result });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// PUT update user
const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", result });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.params.id);
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", result });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Database error" });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };
