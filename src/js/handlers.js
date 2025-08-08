
import { refs } from "./refs.js"
import { FURNITURES_END_POINT } from "./constants.js";
import { getDataByQuery } from "./furniture-api.js";
import { LIMIT } from "./constants.js";

const categoryImageMap = {
    "66504a50a1b2c3d4e5f6a7b8": "Soft_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7b9": "Storage_systems_2x.jpg",
    "66504a50a1b2c3d4e5f6a7ba": "Beds_2x.jpg",
    "66504a50a1b2c3d4e5f6a7bb": "Tables_2x.jpg",
    "66504a50a1b2c3d4e5f6a7bc": "Chairs_2x.jpg",
    "66504a50a1b2c3d4e5f6a7bd": "Citchens_2x.jpg",
    "66504a50a1b2c3d4e5f6a7be": "Children_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7bf": "Ofice_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7c0": "Corridor_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7c1": "Bathroom_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7c2": "Garden_furniture_2x.jpg",
    "66504a50a1b2c3d4e5f6a7c3": "Accessuars_2x.jpg"
};

let page = 1;
let totalPages = 1;


export function createCategoriesGallery(data) { 
    const allCategoriesItem = `
        <li class="gallery-item">   
            <div class="category-thumb all-categories-thumb">
                <p class="category-title">Всі товари</p>
            </div>
        </li>
    `;
    const markup = data.map(({ _id, name }) => {
        const imageUrl = `../img/${categoryImageMap[_id]}`;        
        
        return `
            <li class="gallery-item">   
                <div class="category-thumb" style="background-image: url('${imageUrl}')" >
                <p class="category-title">${name}</p>
                </div>
            </li>
                `;
    }).join("");
    refs.categoriesGallery.insertAdjacentHTML("beforeend", allCategoriesItem + markup);
};

export function createFurnitureGallery(data) {
    return data.map(({ name, color, price, images }) => {
        
        const colorCircles = Array.isArray(color)
            ? color.map(c => `<span class="color-circle" style="background-color: ${c};"></span>`).join("")
            : `<span class="color-circle" style="background-color: ${color};"></span>`;
        
        return `
            <li class="gallery-item">   
                <img class="gallery-img" src="${images[0]}" alt="${name}" width="310", height="256" />
                <h3 class="furniture-title">${name}</h3>
                <div class="furniture-colors">${colorCircles}</div>
                <p class="furniture-price">${price} грн</p>
                <div class="wrapper">
                    <button class="details-btn" type="button">Детальніше</button>
                </div>
            </li>`;
    }).join("");
};

export async function initFurnitureGallery() {
    try {
        const data = await getDataByQuery(FURNITURES_END_POINT, page);
        const markup = createFurnitureGallery(data.furnitures);
        refs.furnitureGallery.innerHTML = markup; 
       
        refs.showMoreBtn.classList.remove("visually-hidden");
 
    } catch (error) {
        console.error("Помилка завантаження меблів:", error.message);
    }
};


export async function loadMoreHandler() {
    page++;
    try {
        const data = await getDataByQuery(FURNITURES_END_POINT, page);
        const markup = createFurnitureGallery(data.furnitures);
        refs.furnitureGallery.insertAdjacentHTML("beforeend", markup);
        console.log(data);
        totalPages = Math.ceil(data.totalItems / LIMIT);
        console.log(totalPages);
        
        
        if (page >= totalPages) {
            refs.showMoreBtn.classList.add("visually-hidden");
        }
        
    } catch(error) {
        console.error("Помилка при завантаженні наступної сторінки:", error.message);
    }
};
