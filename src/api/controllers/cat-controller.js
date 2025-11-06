import { listAllCats, findCatById, addCat } from "../models/cat-model.js";

// ✅ Fetch Data from the Backend to Frontend:

// ✅ GET all cats
const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error("Error fetching cats:", error);
    res.status(500).json({ error: "Database error" });
  }
};
// ✅ GET cat by ID
const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    cat ? res.json(cat) : res.sendStatus(404);
  } catch (error) {
    console.error("Error fetching cats:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ POST new cat
const postCat = async (req, res) => {
  console.log("Form Data:", req.body);
  console.log("File Data:", req.file);

  if (!req.body) {
    return res.status(400).json({ message: "Missing form data" });
  }

  try {
    const { cat_name, weight, owner, birthdate } = req.body;
    const filename = req.file ? req.file.filename : null;

    const result = await addCat({
      cat_name,
      weight,
      owner,
      birthdate,
      filename,
    });

    if (!result) {
      res.status(400).json({ message: "Cat not added" });
      return;
    }

    res.status(201).json({ message: "New cat added", result });
  } catch (error) {
    console.error("Error adding cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ PUT update cat
const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id);
    if (!result) {
      res.status(404).json({ message: "Cat not found" });
      return;
    }
    res.json({ message: "Cat updated", result });
  } catch (error) {
    console.error("Error updating cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ DELETE cat
const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Cat not found" });
      return;
    }
    res.json({ message: "Cat deleted" });
  } catch (error) {
    console.error("Error deleting cat:", error);
    res.status(500).json({ error: "Database error" });
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
