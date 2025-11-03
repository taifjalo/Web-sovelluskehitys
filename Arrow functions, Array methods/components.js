// components.js

// Generate a single restaurant row <tr>
export const restaurantRow = (restaurant, index) => {
  const { name, company } = restaurant; // destructuring
  const tr = document.createElement("tr");
  tr.dataset.index = index;
  tr.innerHTML = `<td>${name}</td><td>${company}</td>`;
  return tr;
};

// Generate modal HTML content for a restaurant and its menu
export const restaurantModal = (restaurant, menu) => {
  // Destructure restaurant properties
  const { name, address, postalCode, city, phone, company } = restaurant;

  // Extract courses using optional chaining and nullish coalescing
  const courses = menu?.courses ?? [];

  // Generate menu HTML string using forEach loop
  let menuHtml = "";
  courses.forEach(({ name, price }) => {
    menuHtml += `<li>${name} (${price ?? "N/A"})</li>`;
  });

  // Return complete modal HTML
  return `
    <h2>${name}</h2>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Postal Code:</strong> ${postalCode}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> ${company}</p>

    <h3>Today's Menu</h3>
    ${
      courses.length === 0
        ? "<p>No daily menu available for today.</p>"
        : `<ul>${menuHtml}</ul>`
    }
    <button id="close-modal">Close</button>
  `;
};
