const restaurantSelect = document.getElementById("restaurantSelect");
const menuContainer = document.getElementById("menuContainer");

// 
async function loadRestaurants() {
  const res = await fetch("https://api.metropolia.fi/ravintolat/");
  const data = await res.json();

  data.forEach(ravintola => {
    const option = document.createElement("option");
    option.value = ravintola.id;
    option.textContent = ravintola.name;
    restaurantSelect.appendChild(option);
  });
}

// 
async function loadMenu(id) {
  const res = await fetch(`https://api.metropolia.fi/ravintolat/${id}/menu`);
  const data = await res.json();

  menuContainer.innerHTML = ""; // مسح القديم
  data.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.name} — ${item.price}`;
    menuContainer.appendChild(p);
  });
}

//
restaurantSelect.addEventListener("change", e => {
  const id = e.target.value;
  if (id) loadMenu(id);
});

loadRestaurants();
