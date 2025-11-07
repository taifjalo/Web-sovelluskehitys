import promisePool from "../../utils/database.js";

<<<<<<< HEAD
const listAllCats = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_cats");
  console.log("rows", rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_cats WHERE cat_id = ?",
=======
// Fetch all cats with owner name
const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN users u ON c.owner = u.user_id
  `);
  return rows;
};

// Fetch cat by ID
const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT c.*, u.name AS owner_name
     FROM wsk_cats c
     JOIN users u ON c.owner = u.user_id
     WHERE c.cat_id = ?`,
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344
    [id],
  );
  return rows.length ? rows[0] : false;
};

<<<<<<< HEAD
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

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ?",
    [id],
  );
  return result.affectedRows ? { message: "success" } : false;
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };
=======
// Add a new cat
const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const [rows] = await promisePool.execute(
    `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate],
  );
  return rows.affectedRows ? { cat_id: rows.insertId } : false;
};

// Update cat
const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);
  const [rows] = await promisePool.execute(sql);
  return rows.affectedRows ? { message: "success" } : false;
};

// Delete cat
const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    "DELETE FROM wsk_cats WHERE cat_id = ?",
    [id],
  );
  return rows.affectedRows ? { message: "success" } : false;
};

// List cats by user
const listCatsByUser = async (userId) => {
  const [rows] = await promisePool.execute(
    `SELECT c.*, u.name AS owner_name
     FROM wsk_cats c
     JOIN users u ON c.owner = u.user_id
     WHERE c.owner = ?`,
    [userId],
  );
  return rows;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  listCatsByUser,
};
>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344
