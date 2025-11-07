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
