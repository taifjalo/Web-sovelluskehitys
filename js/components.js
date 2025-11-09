export const restaurantCard = (r) => {
  const article = document.createElement("article");
  article.className = "product";
  article.dataset.id = r._id;
  article.innerHTML = `
    <h3>${r.name ?? "Unknown"}</h3>
    <div class="meta">${r.company ?? ""} • ${r.city ?? ""}</div>
    <div class="desc muted">${r.address ?? ""}</div>
    <div class="actions">
      <button class="btn primary" data-action="menu">Show menu</button>
      <button class="btn" data-action="fav">❤</button>
      <button class="btn ghost" data-action="map">Map</button>
    </div>
  `;
  return article;
};

export const restaurantModalHtml = (restaurant, menuHtml) => {
  return `
    <div class="dialog-content">
      <div class="close-row"><button id="close-modal" class="btn">Close</button></div>
      <h2>${restaurant.name}</h2>
      <p class="muted">${restaurant.company} • ${restaurant.city}</p>
      <p>${restaurant.address ?? ""}</p>
      <h3>Today's menu</h3>
      ${menuHtml || "<p class='muted'>No menu available</p>"}
    </div>
  `;
};
