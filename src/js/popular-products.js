import { getDataByQuery } from './furniture-api';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { productsData } from './handlers';

let swiperInstance = null;
export let allProductsData = productsData;

console.log(allProductsData);
export async function fetchPopularFurniture() {
  try {
    const endpoint = '/furnitures';
    const params = { type: 'popular' };
    const data = await getDataByQuery(endpoint, params);

    if (
      !data ||
      !Array.isArray(data.furnitures) ||
      data.furnitures.length < 3
    ) {
      console.warn('Недостатньо популярних товарів для відображення слайдера.');
      hidePopularProducts();
      return;
    }

    // Очищаємо та додаємо товари в productsData для модалки
    // productsData.length = 0;
    allProductsData.push(...data.furnitures);

    renderFurnitureCards(data.furnitures);
    initSwiper();
  } catch (error) {
    console.error('Помилка при отриманні популярних товарів:', error);
    hidePopularProducts();
  }
}

function hidePopularProducts() {
  const popularProducts = document.getElementById('popular-products');
  if (popularProducts) {
    popularProducts.style.display = 'none';
  }
}

function renderFurnitureCards(furnitureItems) {
  const swiperWrapper = document.querySelector(
    '.products-swiper .swiper-wrapper'
  );

  if (!swiperWrapper) {
    console.error('Контейнер .products-swiper .swiper-wrapper не знайдено.');
    return;
  }

  const furnitureCards = furnitureItems
    .map(item => {
      const name = item?.name || 'Без назви';
      const price = typeof item?.price === 'number' ? item.price : '—';
      const id = item?._id || '';
      const imageSrc =
        Array.isArray(item?.images) && item.images[0]
          ? item.images[0]
          : 'placeholder.jpg';
      const colorsHtml = Array.isArray(item?.color)
        ? item.color
            .map(
              color =>
                `<span class="color-dot" style="background-color: ${color};"></span>`
            )
            .join('')
        : '';

      return `
          <li class="swiper-slide product-card">
              <img src="${imageSrc}" alt="${name}" class="product-image">
              <div class="furniture-info">
              <h3 class="furniture-title">${name}</h3>
              <div class="product-colors">${colorsHtml}</div>
              <p class="product-price">${price} грн</p>
              </div>
              <button class="details-btn" data-id="${id}">Детальніше</button>
          </li>
        `;
    })
    .join('');

  swiperWrapper.innerHTML = furnitureCards;
}

function initSwiper() {
  const swiperContainer = document.querySelector('.products-swiper');
  if (!swiperContainer) {
    console.error('Контейнер .products-swiper не знайдено.');
    return;
  }

  if (swiperInstance && !swiperInstance.destroyed) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.products-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: '#nextBtnPopular', // унікальні ID
      prevEl: '#prevBtnPopular',
    },
    pagination: {
      el: '.products-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    on: {
      init: function () {
        updateNavigationButtons(this);
      },
      slideChange: function () {
        updateNavigationButtons(this);
      },
    },
  });
}

function updateNavigationButtons(swiper) {
  const prevBtn = document.getElementById('prevBtnPopular');
  const nextBtn = document.getElementById('nextBtnPopular');

  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = swiper.isBeginning;
  nextBtn.disabled = swiper.isEnd;

  prevBtn.classList.toggle('disabled', swiper.isBeginning);
  nextBtn.classList.toggle('disabled', swiper.isEnd);
}
