const catItems = [
  {
    cat_id: 9592,
    cat_name: "Frank",
    weight: 11,
    owner: 3609,
    filename: "f3dbafakjsdfhg4",
    birthdate: "2021-10-12",
  },
  {
    cat_id: 2,
    cat_name: "Luna",
    weight: 5.1,
    owner: "Leo",
    filename: "f3dbafakjsd",
    birthdate: "2021-10-13",
  },
];

const listAllCats = () => catItems;

const findCatById = (id) => catItems.find((cat) => cat.cat_id == id);

const addCat = (cat) => {
  const newId = catItems[0].cat_id + 1;
  catItems.unshift({ cat_id: newId, ...cat });
  return { cat_id: newId };
};

export { listAllCats, findCatById, addCat };
