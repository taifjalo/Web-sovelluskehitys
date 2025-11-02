"use strict";

// API base URL
const restApi = "https://media2.edu.metropolia.fi/restaurant/api/v1";

// Global variables
let restaurants = [];
const tbody = document.getElementById("restaurant-list");

// Connection Function: Generic fetch function
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Get ALL: Load restaurant list
async function loadRestaurants() {
  try {
    restaurants = await fetchData(`${restApi}/restaurants`);

    // Sort alphabetically by name
    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    // Clear old rows (if any)
    tbody.innerHTML = "";

    // Create rows dynamically
    restaurants.forEach((rest, index) => {
      const tr = document.createElement("tr");
      tr.dataset.index = index; // for modal

      const tdName = document.createElement("td");
      tdName.textContent = rest.name;
      tr.appendChild(tdName);

      const tdAddress = document.createElement("td");
      tdAddress.textContent = rest.address;
      tr.appendChild(tdAddress);

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading restaurants:", error);
  }
}

loadRestaurants();

// Logic Handle row click (highlight + modal)
tbody.addEventListener("click", (event) => {
  const tr = event.target.closest("tr");
  if (!tr) return;

  // remove highlight from all rows
  tbody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("highlight"));

  // add highlight to clicked row
  tr.classList.add("highlight");

  // show restaurant details
  showRestaurantDetails(tr.dataset.index);
});

// Show restaurant details in modal
async function showRestaurantDetails(index) {
  const rest = restaurants[index];

  document.getElementById("name").textContent = rest.name;
  document.getElementById("address").textContent = rest.address;
  document.getElementById("postalCode").textContent = rest.postalCode;
  document.getElementById("city").textContent = rest.city;
  document.getElementById("phone").textContent = rest.phone;
  document.getElementById("company").textContent = rest.company;

  // Get: fetch today's menu for the restaurant
  try {
    const menu = await fetchData(`${restApi}/restaurants/daily/${rest._id}/fi`);
    console.log("Menu for", rest.name, menu);

    const menuContainer = document.getElementById("menu");

    if (!menu || !menu.courses || menu.courses.length === 0) {
      menuContainer.innerHTML = "<p>No daily menu available for today.</p>";
    } else {
      const menuItems = menu.courses
        .map((course) => `<li>${course.name} (${course.price || "N/A"})</li>`)
        .join("");
      menuContainer.innerHTML = `<ul>${menuItems}</ul>`;
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
    document.getElementById("menu").innerHTML =
      "<p>Error loading daily menu.</p>";
  }

  document.getElementById("restaurant-modal").showModal();
}
