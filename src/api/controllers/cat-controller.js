import { listAllCats, findCatById, addCat } from "../models/cat-model.js";

const getCat = (req, res) => res.json(listAllCats());

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  cat ? res.json(cat) : res.sendStatus(404);
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  res.status(201).json({ message: "New cat added.", result });
};

const putCat = (req, res) => res.json({ message: "Cat item updated." });

const deleteCat = (req, res) => res.json({ message: "Cat item deleted." });

export { getCat, getCatById, postCat, putCat, deleteCat };
