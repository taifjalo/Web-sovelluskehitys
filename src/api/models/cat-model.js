import promisePool from "../../utils/database.js";

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
    [id],
  );
  return rows.length ? rows[0] : false;
};

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
