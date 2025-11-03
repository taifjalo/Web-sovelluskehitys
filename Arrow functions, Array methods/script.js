"use strict";

import { restaurantRow, restaurantModal } from "./components.js";
import { restApi } from "./variables.js";
import { fetchData } from "./utils.js";

let restaurants = [];
const tbody = document.getElementById("restaurant-list");
const modalContainer = document.getElementById("restaurant-modal");

// Load all restaurants
const loadRestaurants = async (companyFilter) => {
  try {
    restaurants = await fetchData(`${restApi}/restaurants`);
    restaurants.sort((a, b) => (a.name ? a.name.localeCompare(b.name) : 0));

    tbody.innerHTML = "";

    // let's filter() resturent by company name: while we have only two:
    const filteredRestaurants = companyFilter // paramter to loadResturents function to get data from HTML.
      ? restaurants.filter(
          (restaurant) => restaurant?.company === companyFilter
        ) // i used ? to not return error if theres no data, return only undfiand, if something went wrong with array data.
      : restaurants;

    // Append rows to table
    filteredRestaurants.forEach((restaurant, index) => {
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
  document
    .getElementById("close-modal")
    .addEventListener("click", () => modalContainer.close());
});

// Example: filter Sodexo restaurants when needed
document
  .getElementById("filter-sodexo")
  .addEventListener("click", () => loadRestaurants("Sodexo"));

// Example: filter Compass restaurants when needed
document
  .getElementById("filter-compass")
  .addEventListener("click", () => loadRestaurants("Compass Group"));

// Optional: reset filter to show all
document
  .getElementById("show-all")
  .addEventListener("click", () => loadRestaurants());
