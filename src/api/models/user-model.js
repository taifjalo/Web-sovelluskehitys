import promisePool from "../../utils/database.js";

<<<<<<< HEAD
const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
=======
// Fetch all users
const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM users");
  return rows;
};

// Fetch user by ID
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM users WHERE user_id = ?",
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344
    [id],
  );
  return rows.length ? rows[0] : false;
};

<<<<<<< HEAD
const addUser = async ({ name, username, email, role, password }) => {
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)
VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, role, password];

  const [result] = await promisePool.execute(sql, params);
  return result.insertId ? { user_id: result.insertId } : false;
};

// Delete user + cats using TRANSACTION
const removeUserWithCats = async (userId) => {
  const conn = await promisePool.getConnection();

  try {
    await conn.beginTransaction();
    await conn.execute(`DELETE FROM wsk_cats WHERE owner = ?`, [userId]);
    const [result] = await conn.execute(
      `DELETE FROM wsk_users WHERE user_id = ?`,
      [userId],
    );
    await conn.commit();
    return result.affectedRows ? { message: "success" } : false;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export { listAllUsers, findUserById, addUser, removeUserWithCats };
=======
// Add a new user
const addUser = async (user) => {
  const { name, email } = user;
  const [rows] = await promisePool.execute(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
  );

  if (rows.affectedRows === 0) return false;
  return { user_id: rows.insertId };
};

// Update user
const modifyUser = async (user, id) => {
  const sql = promisePool.format("UPDATE users SET ? WHERE user_id = ?", [
    user,
    id,
  ]);
  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) return false;
  return { message: "success" };
};

// Delete a user and their cats using transaction
const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    // Delete all cats owned by the user
    await connection.execute("DELETE FROM wsk_cats WHERE owner = ?", [id]);

    // Delete the user
    const [result] = await connection.execute(
      "DELETE FROM users WHERE user_id = ?",
      [id],
    );

    await connection.commit();

    if (result.affectedRows === 0) return false;
    return { message: "success" };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export { listAllUsers, findUserById, addUser, modifyUser, removeUser };
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344
