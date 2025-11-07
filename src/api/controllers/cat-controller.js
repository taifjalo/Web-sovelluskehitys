import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  listCatsByUser,
} from "../models/cat-model.js";

// GET all cats
const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error("Error fetching cats:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// GET cat by ID
const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    cat ? res.json(cat) : res.sendStatus(404);
  } catch (error) {
    console.error("Error fetching cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// GET cats by user ID
const getCatsByUser = async (req, res) => {
  try {
    const cats = await listCatsByUser(req.params.userId);
    res.json(cats);
  } catch (error) {
    console.error("Error fetching cats by user:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// POST new cat
const postCat = async (req, res) => {
  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file ? req.file.filename : null;
  try {
    const result = await addCat({
      cat_name,
      weight,
      owner,
      birthdate,
      filename,
    });
    result
      ? res.status(201).json({ message: "New cat added", result })
      : res.status(400).json({ message: "Cat not added" });
  } catch (error) {
    console.error("Error adding cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// PUT update cat
const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id);
    result
      ? res.json({ message: "Cat updated", result })
      : res.status(404).json({ message: "Cat not found" });
  } catch (error) {
    console.error("Error updating cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// DELETE cat
const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);
    result
      ? res.json({ message: "Cat deleted", result })
      : res.status(404).json({ message: "Cat not found" });
  } catch (error) {
    console.error("Error deleting cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

export { getCat, getCatById, getCatsByUser, postCat, putCat, deleteCat };
