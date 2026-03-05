function create(item) {
    return `
    <div class="product">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <h4>${item.shortname}</h4>
      <p>${item.description}</p>
      <p class="price">${item.price}</p>
    </div>
  `;
}
function catalogs() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then((categories) => {
        let html = '<div class="container">';
        for (const value of categories) {
            html += `<div class="link" onclick="category('${value.shortname}')">${value.name}</div>`;
        }
        html += `<div class="link" onclick="random()">Specials</div>`;
        html += '</div>';
        const content = document.getElementById('content');
        if (content)
            content.innerHTML = html;
    });
}
function category(shortname) {
    fetch(`data/${shortname}.json`)
        .then(response => response.json())
        .then((data) => {
        let html = `<h2 class="title">${data.category}</h2><div class="container">`;
        for (const item of data.items) {
            html += create(item);
        }
        html += `</div>`;
        const content = document.getElementById("content");
        if (content)
            content.innerHTML = html;
    });
}
function random() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then((categories) => {
        const index = Math.floor(Math.random() * categories.length);
        const randomCat = categories[index];
        if (randomCat) {
            category(randomCat.shortname);
        }
    });
}
window.catalogs = catalogs;
window.category = category;
window.random = random;
export {};
//# sourceMappingURL=main.js.map