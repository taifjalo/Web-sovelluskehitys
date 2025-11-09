const KEY = "sr:favorites";
export const getFavs = () => JSON.parse(localStorage.getItem(KEY) || "[]");
export const addFav = (id) => {
  const arr = getFavs();
  if (!arr.includes(id)) {
    arr.push(id);
    localStorage.setItem(KEY, JSON.stringify(arr));
  }
};
export const removeFav = (id) => {
  const arr = getFavs().filter((x) => x !== id);
  localStorage.setItem(KEY, JSON.stringify(arr));
};
export const isFav = (id) => getFavs().includes(id);
