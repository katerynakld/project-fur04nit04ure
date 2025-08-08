
import { getDataByQuery } from "./js/furniture-api";
import { createCategoriesGallery, createFurnitureGallery, loadMoreHandler } from "./js/handlers";
import { CATEGORIES_END_POINT, FURNITURES_END_POINT } from "./js/constants";
import { refs } from "./js/refs";

let page = 1;

getDataByQuery(CATEGORIES_END_POINT)
    .then(data => {
        createCategoriesGallery(data);
    })
    .catch(error => {
        console.error(error.message);
    });

getDataByQuery(FURNITURES_END_POINT, page)
    .then(data => {
        createFurnitureGallery(data.furnitures);

    })
    .catch(error => {
        console.error(error.message);
    });

refs.showMoreBtn.addEventListener("click", loadMoreHandler); 
