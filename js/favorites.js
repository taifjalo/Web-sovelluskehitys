import { getLoggedUser, saveLoggedUser } from "./auth.js";

export const getFavs = () => {
  const user = getLoggedUser();
  return user?.favorites || [];
};

export const addFav = (id) => {
  const user = getLoggedUser();
  if (!user) return;
  if (!user.favorites.includes(id)) user.favorites.push(id);
  saveLoggedUser(user);
};

export const removeFav = (id) => {
  const user = getLoggedUser();
  if (!user) return;
  user.favorites = user.favorites.filter((x) => x !== id);
  saveLoggedUser(user);
};

export const isFav = (id) => getFavs().includes(id);
