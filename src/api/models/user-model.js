import promisePool from "../../utils/database.js";

// Fetch all users
const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM users");
  return rows;
};

// Fetch user by ID
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM users WHERE user_id = ?",
    [id],
  );
  return rows.length ? rows[0] : false;
};

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
