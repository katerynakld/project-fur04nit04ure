import Raty from 'raty-js';

export const CATEGORIES_END_POINT = '/categories';
export const FURNITURES_END_POINT = '/furnitures';

const BASE_URL = 'https://furniture-store.b.goit.study/api';

let productsData = [];

// 1. Завантаження даних з бекенду
export async function getDataByQuery(endPoint, page = 1) {
  try {
    // showLoader();

    const url = new URL(`${BASE_URL}${FURNITURES_END_POINT}`);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', 8);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // hideLoader();
    productsData = data.furnitures;

    console.log(productsData);
    renderGallery(productsData);
  } catch (error) {
    console.log(error.message);
  }
}

// 2. Рендеримо картки (якщо потрібно)
function renderGallery(products) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = products
    .map(
      ({ _id, name, images }) => `
    <li class="gallery-item">
      <img src="${images[0]}" alt="${name}">
      <button class="details-btn" data-id="${_id}">Детальніше</button>
    </li>
  `
    )
    .join('');
}
// ------------------мій код---------------------
// 3. Відкриття модалки по кліку на .details-btn
document.addEventListener('click', event => {
  const btn = event.target.closest('.details-btn');
  if (!btn) return;

  const id = btn.dataset.id;
  const product = productsData.find(p => p._id === id);
  if (product) fillModal(product);
});

// 4. Заповнення твоєї HTML-модалки

export let orderData = {
  id: '',
  color: '',
};

function fillModal(product) {
  orderData.id = product._id;

  const modal = document.querySelector('[data-modal]');

  const galleryHTML = product.images
    .map(
      (src, i) => `
    <li class="${i === 0 ? 'large' : 'small'}">
      <img class="gallery-images" src="${src}" alt="${product.name}-${i + 1}">
    </li>
  `
    )
    .join('');
  modal.querySelector('.gallery-details').innerHTML = galleryHTML;

  modal.querySelector('.details-title').textContent = product.name;
  modal.querySelector('.details-category').textContent = product.category.name;
  modal.querySelector(
    '.details-price'
  ).innerHTML = `${product.price} <span class="price-currency">грн</span>`;

  const colorsHTML = product.color
    .map(
      (color, i) => `
    <li>
      <input class="color-checkbox visually-hidden" type="checkbox" id="color${
        i + 1
      }" value="${color}">
      <label class="color-label" for="color${i + 1}">
        <span class="modal-checkbox" style="background-color:${color}"></span>
      </label>
    </li>
  `
    )
    .join('');
  modal.querySelector('.color-options').innerHTML = colorsHTML;

  modal.querySelector('.details-description').textContent = product.description;
  modal.querySelector('.details-size').textContent = product.sizes;

  console.log('rating:', product.rate);

  new Raty(document.querySelector('#rater'), {
    score: product.rate,
    half: true,
    readOnly: true,
    round: { down: 0.25, full: 0.6, up: 0.76 },
    number: 5,
    starType: 'svg',
  });

  console.log(document.getElementById('rater').innerHTML);

  modal.classList.add('is-open');
  document.body.classList.add('modal-open');

  // ініціалізація чекбоксів (щоб можна було вибирати лише один колір)
  initColorCheckboxes();

  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('click', handleOverlayClose);
  modal
    .querySelector('[data-modal-close]')
    .addEventListener('click', closeModal);
}

// --------------------
// ** Ініціалізація чекбоксів для вибору одного кольору **
function initColorCheckboxes() {
  const checkboxes = document.querySelectorAll('.color-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
      }
    });
  });
}

// --------------------
// ** Обробник кнопки замовлення **
document
  .querySelector('.modal-order-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();

    const checkedBox = document.querySelector('.color-checkbox:checked');

    if (!checkedBox) {
      console.log('Нічого не вибрано');
      return;
    }
    orderData.color = checkedBox.value;

    closeModal();

    openOrderModal();
  });

// 5. Закриття модалки
function closeModal() {
  const modal = document.querySelector('[data-modal]');
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscClose);
  modal.removeEventListener('click', handleOverlayClose);
  modal
    .querySelector('[data-modal-close]')
    .removeEventListener('click', closeModal);
}

function handleOverlayClose(e) {
  if (e.target.hasAttribute('data-modal')) {
    closeModal();
  }
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// 6. Запускаємо завантаження товарів
getDataByQuery(FURNITURES_END_POINT, 1);
