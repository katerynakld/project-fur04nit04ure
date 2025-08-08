
import { getDataByQuery } from "./js/furniture-api";
import { createCategoriesGallery, initFurnitureGallery, loadMoreHandler } from "./js/handlers";
import { CATEGORIES_END_POINT, FURNITURES_END_POINT } from "./js/constants";
import { refs } from "./js/refs";

getDataByQuery(CATEGORIES_END_POINT)
    .then(data => {
        createCategoriesGallery(data);
    })
    .catch(error => {
        console.error(error.message);
    });

getDataByQuery(FURNITURES_END_POINT)
    .then(data => {
        initFurnitureGallery(data.furnitures);

    })
    .catch(error => {
        console.error(error.message);
    });

refs.showMoreBtn.addEventListener("click", loadMoreHandler); 
