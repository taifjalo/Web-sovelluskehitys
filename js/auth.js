"use strict";
const KEY = "sr:user";
export const loginLocal = async (username, password) => {
  // For assignment: you can either call real auth API OR mock
  // Minimal mock: accept any username and store object
  const user = { username, displayName: username, id: username, avatar: null };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
};
export const logout = () => localStorage.removeItem(KEY);
export const getUser = () => JSON.parse(localStorage.getItem(KEY) || "null");

// ----- Helpers -----
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

// ----- REGISTER -----
export const registerUser = (name, email, password) => {
  const users = getUsers();

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    alert("User already exists with this email!");
    return false;
  }

  // Create new user object
  const newUser = {
    name,
    email,
    password,
    favorites: [],
    avatar: "",
  };

  users.push(newUser);
  saveUsers(users);
  alert("Registration successful! You can now login.");
  return true;
};

// ----- LOGIN -----
export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return false;
  }

  localStorage.setItem("loggedUser", JSON.stringify(user));
  return true;
};

// ----- LOGOUT -----
export const logoutUser = () => {
  localStorage.removeItem("loggedUser");
};

// ----- CHECK AUTH -----
export const getLoggedUser = () =>
  JSON.parse(localStorage.getItem("loggedUser"));
