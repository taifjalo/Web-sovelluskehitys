import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
    [id],
  );
  return rows.length ? rows[0] : false;
};

const getUserByUsername = async (username) => {
  const sql = "SELECT * FROM wsk_users WHERE username = ?";
  const [rows] = await promisePool.execute(sql, [username]);
  return rows.length ? rows[0] : false;
};

const addUser = async (user) => {
  const { name, username, email, password, role } = user;

  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;

  const params = [name, username, email, password, role];

  const [result] = await promisePool.execute(sql, params);
  return result.insertId ? { user_id: result.insertId } : false;
};

export { listAllUsers, findUserById, addUser, getUserByUsername };
