import { getDataByQuery } from './js/furniture-api';
import {
  createCategoriesGallery,
  hidefLoader,
  initFurnitureGallery,
  loadMoreHandler,
  onCategoryClick,
} from './js/handlers';
import { CATEGORIES_END_POINT, FURNITURES_END_POINT } from './js/constants';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', hidefLoader);

getDataByQuery(CATEGORIES_END_POINT, { page: 1, limit: 100 })
  .then(data => {
    createCategoriesGallery(data);
    refs.categoriesGallery.addEventListener('click', onCategoryClick);
  })
  .catch(error => {
    alert(error.message);
  });

initFurnitureGallery().catch(error => {
  alert(error.message);
});

refs.showMoreBtn.addEventListener('click', loadMoreHandler);
