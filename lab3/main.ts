interface DogProduct {
    id: number;
    name: string;
    shortname: string;
    description: string;
    price: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
    shortname: string;
    notes: string;
}

interface CategoryData {
    category: string;
    items: DogProduct[];
}

function create(item: DogProduct): string {
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

function catalogs(): void {
  fetch('data/categories.json')
    .then(response => response.json() as Promise<Category[]>)
    .then((categories: Category[]) => {
      let html: string = '<div class="container">';
      
      for (const value of categories) {
        html += `<div class="link" onclick="category('${value.shortname}')">${value.name}</div>`;
      }
      
      html += `<div class="link" onclick="random()">Specials</div>`;
      html += '</div>';
      
      const content = document.getElementById('content');
      if (content) content.innerHTML = html;
    });
}

function category(shortname: string): void {
  fetch(`data/${shortname}.json`)
    .then(response => response.json() as Promise<CategoryData>)
    .then((data: CategoryData) => {
      let html: string = `<h2 class="title">${data.category}</h2><div class="container">`;
      
      for (const item of data.items) {
        html += create(item);
      }
      
      html += `</div>`;
      
      const content = document.getElementById("content");
      if (content) content.innerHTML = html;
    });
}

function random(): void {
  fetch('data/categories.json')
    .then(response => response.json() as Promise<Category[]>)
    .then((categories: Category[]) => {
      const index: number = Math.floor(Math.random() * categories.length);
      const randomCat = categories[index];
      
      if (randomCat) {
        category(randomCat.shortname);
      }
    });
}

(window as any).catalogs = catalogs;
(window as any).category = category;
(window as any).random = random;