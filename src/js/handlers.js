//Файл для збереження хендлерів

import { refs } from './refs.js';
import { FURNITURES_END_POINT } from './constants.js';
import { getDataByQuery } from './furniture-api.js';
import { LIMIT } from './constants.js';

export function openOrderModal() {
  refs.orderModalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeOrderModal() {
  refs.orderModalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  refs.orderFormEl.reset();
}

const categoryImageMap = {
  '66504a50a1b2c3d4e5f6a7b8': 'Soft_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7b9': 'Storage_systems_2x.jpg',
  '66504a50a1b2c3d4e5f6a7ba': 'Beds_2x.jpg',
  '66504a50a1b2c3d4e5f6a7bb': 'Tables_2x.jpg',
  '66504a50a1b2c3d4e5f6a7bc': 'Chairs_2x.jpg',
  '66504a50a1b2c3d4e5f6a7bd': 'Citchens_2x.jpg',
  '66504a50a1b2c3d4e5f6a7be': 'Children_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7bf': 'Ofice_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7c0': 'Corridor_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7c1': 'Bathroom_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7c2': 'Garden_furniture_2x.jpg',
  '66504a50a1b2c3d4e5f6a7c3': 'Accessuars_2x.jpg',
};

let page = 1;
let totalPages = 1;
let currentCategoryId = '';
let isLoading = false;
export let productsData = [];

export function createCategoriesGallery(data) {
  const allCategoriesItem = `
        <li class="category-item">
            <div class="category-thumb all-categories-thumb" data-category-id="">
                <p class="category-title">Всі товари</p>
            </div>
        </li>
    `;
  const markup = data
    .map(({ _id, name }) => {
      const imageUrl = `/img/${categoryImageMap[_id]}`;

      return `<li class="category-item"><div class="category-thumb" data-category-id="${_id}" style="background-image: url('${imageUrl}')" >
 <p class="category-title">${name}</p>
                </div>
            </li>`;
    })
    .join('');

  refs.categoriesGallery.insertAdjacentHTML(
    'beforeend',
    allCategoriesItem + markup
  );
}

export function createFurnitureGallery(data) {
  return data
    .map(({ name, color, price, images, _id }) => {
      const firstImg = images[0] || '/img/All_products_2x.jpg';
      const colorCircles = Array.isArray(color)
        ? color
            .map(
              c =>
                `<span class="color-circle" style="background-color: ${c};"></span>`
            )
            .join('')
        : `<span class="color-circle" style="background-color: ${color};"></span>`;

      return `
            <li class="gallery-item">
                <img class="gallery-img" src="${firstImg}" alt="${name}" />
                <h3 class="furniture-title">${name}</h3>
                <div class="furniture-colors">${colorCircles}</div>
                <p class="furniture-price">${price} грн</p>
                <div class="wrapper">
                    <button class="details-btn" type="button" data-id="${_id}">Детальніше</button>
                </div>
            </li>`;
    })
    .join('');
}

export async function initFurnitureGallery() {
  try {
    page = 1;
    isLoading = true;
    refs.showMoreBtn.classList.add('visually-hidden');
    showLoader();

    const data = await getDataByQuery(FURNITURES_END_POINT, bildParams(page));
    refs.furnitureGallery.innerHTML = createFurnitureGallery(data.furnitures);

    productsData.length = 0;
    productsData.push(...data.furnitures);

    totalPages = Math.ceil((data.totalItems ?? 0) / LIMIT);
    if (totalPages > page) refs.showMoreBtn.classList.remove('visually-hidden');
  } catch (error) {
    alert('Помилка завантаження меблів:', error.message);
  } finally {
    hideLoader();
    isLoading = false;
  }
}

export async function loadMoreHandler() {
  if (isLoading) return;
  if (page >= totalPages) {
    refs.showMoreBtn.classList.add('visually-hidden');
    return;
  }

  isLoading = true;
  refs.showMoreBtn.disabled = true;
  showLoader();

  try {
    const nextPage = page + 1;
    const data = await getDataByQuery(
      FURNITURES_END_POINT,
      bildParams(nextPage)
    );
    refs.furnitureGallery.insertAdjacentHTML(
      'beforeend',
      createFurnitureGallery(data.furnitures)
    );

    productsData.push(...data.furnitures);

    page = nextPage;

    if (page >= totalPages) {
      refs.showMoreBtn.classList.add('visually-hidden');
    }
  } catch (error) {
    alert('Помилка при завантаженні наступної сторінки:', error.message);
  } finally {
    hideLoader();
    refs.showMoreBtn.disabled = false;
    isLoading = false;
  }
}

function bildParams(pageNum) {
  const params = { page: pageNum, limit: LIMIT };
  if (currentCategoryId) params.category = currentCategoryId;
  return params;
}

export async function onCategoryClick(event) {
  const thumb = event.target.closest('.category-thumb');
  if (!thumb) return;

  const categoryId = thumb.dataset.categoryId ?? '';
  if (categoryId === currentCategoryId && page === 1) return;

  // Опціонально: активний стан
  document
    .querySelectorAll('.category-thumb.active')
    .forEach(el => el.classList.remove('active'));
  thumb.classList.add('active');

  currentCategoryId = categoryId;
  await reloadFirstPage();
}

async function reloadFirstPage() {
  try {
    page = 1;
    refs.showMoreBtn.classList.add('visually-hidden');
    refs.furnitureGallery.innerHTML = '';
    showLoader();

    const data = await getDataByQuery(FURNITURES_END_POINT, bildParams(page));
    refs.furnitureGallery.innerHTML = createFurnitureGallery(data.furnitures);

    totalPages =
      Math.ceil((data.totalItems ?? 0) / LIMIT) || (data.totalPages ?? 1);
    if (totalPages > 1) refs.showMoreBtn.classList.remove('visually-hidden');
  } catch (error) {
    alert('Помилка перезавантаження першої сторінки:', error.message);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  refs.loader?.classList.remove('hidden');
  refs.loader?.setAttribute('aria-hidden', 'false');
}

function hideLoader() {
  refs.loader?.classList.add('hidden');
  refs.loader?.setAttribute('aria-hidden', 'true');
}
