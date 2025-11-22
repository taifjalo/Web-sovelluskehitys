import { getRestaurants, getDailyMenu, getWeeklyMenu } from "./api.js";
import { restaurantCard, restaurantModalHtml } from "./components.js";
import { registerUser, loginUser, getLoggedUser, logoutUser } from "./auth.js";
import { getFavs, addFav, removeFav, isFav } from "./favorites.js";

import { initMap } from "./map.js";

// DOM elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginSection = document.getElementById("login-view");
const homeSection = document.getElementById("home-view");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const btnFavs = document.getElementById("btn-favs");

const grid = document.getElementById("restaurant-grid");
const modal = document.getElementById("restaurant-modal");
const favsList = document.getElementById("favorites-list");
const homeEmpty = document.getElementById("home-empty");
const favsEmpty = document.getElementById("favs-empty");

let restaurants = [];
let viewMode = "day"; // or 'week'

// ---------------- Nav / Logout ----------------
function updateNav() {
  const user = getLoggedUser();
  if (user) {
    btnLogout.classList.remove("hidden");
    btnLogin.classList.add("hidden");
    btnFavs.classList.remove("hidden");
  } else {
    btnLogout.classList.add("hidden");
    btnLogin.classList.remove("hidden");
    btnFavs.classList.add("hidden");
  }
}

btnLogout.addEventListener("click", () => {
  logoutUser();
  alert("You have logged out");
  showView("login");
  updateNav();
});

// ---------------- Show views ----------------
function showView(name) {
  document
    .getElementById("home-view")
    .classList.toggle("hidden", name !== "home");
  document
    .getElementById("favs-view")
    .classList.toggle("hidden", name !== "favs");
  document
    .getElementById("login-view")
    .classList.toggle("hidden", name !== "login");
  document
    .getElementById("map-view")
    .classList.toggle("hidden", name !== "map");
}

// ---------------- Switch login/register forms ----------------
document.getElementById("show-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});
document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// ---------------- Handle login/register ----------------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (loginUser(email, password)) {
    alert("Welcome back!");
    showView("home");
    updateNav();
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  if (registerUser(name, email, password)) {
    alert("Registration successful!");
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }
});

// ---------------- Load & render restaurants ----------------
async function loadRestaurants(companyFilter = "", q = "") {
  try {
    const all = await getRestaurants();
    restaurants = (all || [])
      .slice()
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    let filtered = restaurants.filter((r) => {
      if (companyFilter && r.company !== companyFilter) return false;
      if (
        q &&
        !(
          (r.name || "").toLowerCase().includes(q) ||
          (r.city || "").toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
    grid.innerHTML = "";
    if (filtered.length === 0) homeEmpty.classList.remove("hidden");
    else {
      homeEmpty.classList.add("hidden");
      filtered.forEach((r) => grid.appendChild(restaurantCard(r)));
    }
  } catch (err) {
    console.error(err);
    grid.innerHTML = "<p class='muted'>Failed to load restaurants.</p>";
  }
}

// ---------------- Restaurant card actions ----------------
grid.addEventListener("click", async (e) => {
  const card = e.target.closest(".product");
  if (!card) return;
  const id = card.dataset.id;
  const action = e.target.dataset.action;
  if (action === "menu") {
    try {
      const menu =
        viewMode === "day" ? await getDailyMenu(id) : await getWeeklyMenu(id);
      const courses = menu?.courses ?? [];
      const html =
        courses.length === 0
          ? "<p class='muted'>No menu</p>"
          : `<ul>${courses
              .map((c) => `<li>${c.name} (${c.price ?? "N/A"})</li>`)
              .join("")}</ul>`;
      modal.innerHTML = restaurantModalHtml(
        restaurants.find((r) => r._id === id),
        html
      );
      modal.showModal();
      document
        .getElementById("close-modal")
        .addEventListener("click", () => modal.close());
    } catch (err) {
      console.error(err);
      modal.innerHTML = `<div class="dialog-content"><p class='muted'>Failed to load menu.</p><div class="close-row"><button id="close-modal" class="btn">Close</button></div></div>`;
      modal.showModal();
      document
        .getElementById("close-modal")
        .addEventListener("click", () => modal.close());
    }
  } else if (action === "fav") {
    const user = getLoggedUser();
    if (!user) {
      alert("This feature only for registered people! ❤");
      return;
    }

    if (isFav(id)) {
      removeFav(id);
      e.target.textContent = "★";
    } else {
      addFav(id);
      e.target.textContent = "❤";
    }

    renderFavs(); // Update favorites view if open
  } else if (action === "map") {
    showView("map");
    initMap(restaurants);
  }
});

// ---------------- Favorites renderer ----------------
function renderFavs() {
  const favIds = getFavs(); // Get favorite restaurant IDs of logged-in user
  favsList.innerHTML = "";

  if (favIds.length === 0) {
    favsEmpty.classList.remove("hidden");
  } else {
    favsEmpty.classList.add("hidden");
    favIds.forEach((id) => {
      const r = restaurants.find((x) => x._id === id);
      if (r) favsList.appendChild(restaurantCard(r));
    });
  }
}

// ---------------- Controls ----------------
document.getElementById("filter-company").addEventListener("change", (e) => {
  loadRestaurants(
    e.target.value,
    document.getElementById("search").value.toLowerCase()
  );
});
document.getElementById("search").addEventListener("input", (e) => {
  loadRestaurants(
    document.getElementById("filter-company").value,
    e.target.value.toLowerCase()
  );
});
document.getElementById("view-day").addEventListener("click", () => {
  viewMode = "day";
  document.getElementById("view-day").classList.add("active");
  document.getElementById("view-week").classList.remove("active");
});
document.getElementById("view-week").addEventListener("click", () => {
  viewMode = "week";
  document.getElementById("view-week").classList.add("active");
  document.getElementById("view-day").classList.remove("active");
});

// ---------------- Nav buttons ----------------
document
  .getElementById("btn-home")
  .addEventListener("click", () => showView("home"));
document.getElementById("btn-favs").addEventListener("click", () => {
  renderFavs();
  showView("favs");
});
document
  .getElementById("btn-login")
  .addEventListener("click", () => showView("login"));
document
  .getElementById("btn-map")
  .addEventListener("click", () => showView("map"));

// ---------------- Initial load ----------------
window.addEventListener("DOMContentLoaded", async () => {
  const user = getLoggedUser();
  if (user) showView("home");
  else showView("login");
  updateNav();
  await loadRestaurants();
});
