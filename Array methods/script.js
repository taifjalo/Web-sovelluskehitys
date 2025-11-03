"use strict";

import { restaurantRow, restaurantModal } from "./components.js";
import { restApi } from "./variables.js";
import { fetchData } from "./utils.js";

let restaurants = [];
const tbody = document.getElementById("restaurant-list");
const modalContainer = document.getElementById("restaurant-modal");

// Load all restaurants
const loadRestaurants = async () => {
  try {
    restaurants = await fetchData(`${restApi}/restaurants`);
    restaurants.sort((a, b) => (a.name ? a.name.localeCompare(b.name) : 0));

    tbody.innerHTML = "";
    restaurants.forEach((restaurant, index) => {
      tbody.appendChild(restaurantRow(restaurant, index));
    });
  } catch (error) {
    console.error("Error loading restaurants:", error);
  }
};

loadRestaurants();

// Handle table row clicks
tbody.addEventListener("click", async (event) => {
  const tr = event.target.closest("tr");
  if (!tr) return;

  tbody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("highlight"));
  tr.classList.add("highlight");

  const index = tr.dataset.index;
  const restaurant = restaurants[index];

  // Fetch today's menu
  const menu = await fetchData(
    `${restApi}/restaurants/daily/${restaurant._id}/fi`
  );

  // Generate modal HTML and show it
  modalContainer.innerHTML = restaurantModal(restaurant, menu);
  modalContainer.showModal();

  // Add event listener for close button
  document.getElementById("close-modal").addEventListener("click", () => {
    modalContainer.close();
  });
});
