import { listAllCats, findCatById, addCat } from "../models/cat-model.js";

const getCat = (req, res) => res.json(listAllCats());

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  cat ? res.json(cat) : res.sendStatus(404);
};

const postCat = (req, res) => {
  console.log("Form Data:", req.body);
  console.log("File Data:", req.file);

  if (!req.body || !req.file) {
    return res.status(400).json({ message: "Missing form or file data" });
  }

  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file.filename;

  const result = addCat({
    cat_name,
    weight,
    owner,
    birthdate,
    filename,
  });

  res.status(201).json({ message: "New cat added", result });
};

const putCat = (req, res) => res.json({ message: "Cat item updated." });

const deleteCat = (req, res) => res.json({ message: "Cat item deleted." });

export { getCat, getCatById, postCat, putCat, deleteCat };
