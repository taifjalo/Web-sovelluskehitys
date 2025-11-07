import promisePool from "../../utils/database.js";

const listAllCats = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_cats");
  console.log("rows", rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_cats WHERE cat_id = ?",
    [id],
  );
  return rows.length ? rows[0] : false;
};

const addCat = async ({ cat_name, weight, owner, filename, birthdate }) => {
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];

  const [result] = await promisePool.execute(sql, params);
  return result.insertId ? { cat_id: result.insertId } : false;
};

const modifyCat = async (data, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
    data,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  return result.affectedRows ? { message: "success" } : false;
};

const removeCat = async (id, isAdmin, userId) => {
  if (isAdmin) {
    const [result] = await promisePool.execute(
      "DELETE FROM wsk_cats WHERE cat_id = ?",
      [id],
    );
    return result.affectedRows ? { message: "success" } : false;
  }

  // normal user: check owner
  const [result] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?",
    [id, userId],
  );
  return result.affectedRows ? { message: "success" } : false;
};

const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [username]);
  return rows.length ? rows[0] : false;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  getUserByUsername,
};
