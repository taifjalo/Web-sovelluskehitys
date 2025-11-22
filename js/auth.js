const KEY_USERS = "sr:users";
const KEY_LOGGED = "sr:loggedUser";

const getUsers = () => JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
const saveUsers = (u) => localStorage.setItem(KEY_USERS, JSON.stringify(u));

export const registerUser = (name, email, password) => {
  const users = getUsers();
  if (users.some((x) => x.email === email)) {
    alert("User exists");
    return false;
  }
  users.push({ name, email, password, favorites: [], avatar: "" });
  saveUsers(users);
  alert("Registered — now login");
  return true;
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((x) => x.email === email && x.password === password);
  if (!user) {
    alert("Invalid credentials");
    return false;
  }
  localStorage.setItem(KEY_LOGGED, JSON.stringify(user));
  return true;
};

export const logoutUser = () => {
  localStorage.removeItem(KEY_LOGGED);
};

export const getLoggedUser = () =>
  JSON.parse(localStorage.getItem(KEY_LOGGED) || "null");

export const saveLoggedUser = (user) => {
  localStorage.setItem(KEY_LOGGED, JSON.stringify(user));
};
