import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
} from "../models/cat-model.js";

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  cat ? res.json(cat) : res.sendStatus(404);
};

const postCat = async (req, res) => {
  if (!req.body || !req.file)
    return res.status(400).json({ message: "Missing form or file data" });

  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file.filename;

  const result = await addCat({
    cat_name,
    weight,
    owner,
    birthdate,
    filename,
  });

  res.status(201).json({ message: "New cat added", result });
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  result ? res.json(result) : res.sendStatus(404);
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  result ? res.json(result) : res.sendStatus(404);
};

export { getCat, getCatById, postCat, putCat, deleteCat };
