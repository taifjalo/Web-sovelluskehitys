const catItems = [
  { cat_id: 1, cat_name: "Mittens", weight: 4.2, owner: "Sara" },
  { cat_id: 2, cat_name: "Luna", weight: 5.1, owner: "Leo" },
];

const listAllCats = () => catItems;

const findCatById = (id) => catItems.find((cat) => cat.cat_id == id);

const addCat = (cat) => {
  const newId = catItems[catItems.length - 1].cat_id + 1;
  catItems.push({ cat_id: newId, ...cat });
  return { cat_id: newId };
};

export { listAllCats, findCatById, addCat };
