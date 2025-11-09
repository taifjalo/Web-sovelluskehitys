import { getRestaurants, getDailyMenu, getWeeklyMenu } from "./api.js";
import { restaurantCard, restaurantModalHtml } from "./components.js";
import { fetchData } from "./utils.js";
import { initMap } from "./map.js";

import {
  registerUser,
  loginUser,
  getLoggedUser,
  logoutUser,
} from "./js/auth.js";

// DOM elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginSection = document.getElementById("login-section");
const homeSection = document.getElementById("home-section");

// Switch forms
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

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (loginUser(email, password)) {
    alert("Welcome back!");
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  }
});

// Handle register
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (registerUser(name, email, password)) {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }
});

// Auto login check
window.addEventListener("DOMContentLoaded", () => {
  const user = getLoggedUser();
  if (user) {
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  }
});

const grid = document.getElementById("restaurant-grid");
const modal = document.getElementById("restaurant-modal");
const favsList = document.getElementById("favorites-list");
const homeEmpty = document.getElementById("home-empty");
const favsEmpty = document.getElementById("favs-empty");

let restaurants = [];
let viewMode = "day"; // or 'week'

// load & render
async function loadRestaurants(companyFilter = "", q = "") {
  try {
    const all = await getRestaurants();
    // sort by name
    restaurants = (all || [])
      .slice()
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    // filter company and search
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
    if (filtered.length === 0) {
      homeEmpty.classList.remove("hidden");
    } else {
      homeEmpty.classList.add("hidden");
      filtered.forEach((r) => grid.appendChild(restaurantCard(r)));
    }
  } catch (err) {
    console.error(err);
    grid.innerHTML = "<p class='muted'>Failed to load restaurants.</p>";
  }
}

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
      console.error("menu error", err);
      modal.innerHTML = `<div class="dialog-content"><p class="muted">Failed to load menu.</p><div class="close-row"><button id="close-modal" class="btn">Close</button></div></div>`;
      modal.showModal();
      document
        .getElementById("close-modal")
        .addEventListener("click", () => modal.close());
    }
  } else if (action === "fav") {
    // simple local favorites: toggle visual only (we'll add real favorite storage later)
    e.target.textContent = e.target.textContent === "★" ? "❤" : "★";
    renderFavs();
  } else if (action === "map") {
    // Show map view and initialize map
    showView("map");
    initMap(restaurants);
  }
});

// controls
document.getElementById("filter-company").addEventListener("change", (e) => {
  const company = e.target.value;
  loadRestaurants(
    company,
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

// nav
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
}

// simple favorites renderer (placeholder)
function renderFavs() {
  // naive: find cards with star (★) and treat them as favs
  const stars = Array.from(
    document.querySelectorAll(".product button[data-action='fav']")
  ).filter((b) => b.textContent.trim() === "★");
  const ids = stars.map((b) => b.closest(".product").dataset.id);
  favsList.innerHTML = "";
  if (ids.length === 0) {
    favsEmpty.classList.remove("hidden");
  } else {
    favsEmpty.classList.add("hidden");
    ids.forEach((id) => {
      const r = restaurants.find((x) => x._id === id);
      if (r) favsList.appendChild(restaurantCard(r));
    });
  }
}

// login form (mock)
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("Mock login — next step: implement auth.");
  showView("home");
});

// initial load
await loadRestaurants();
