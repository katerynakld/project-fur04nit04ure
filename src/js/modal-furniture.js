import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { generateStars, openOrderModal } from './helpers.js';
import { productsData } from './handlers.js';

document.addEventListener('click', event => {
  const btn = event.target.closest('.details-btn');
  if (!btn) return;

  const id = btn.dataset.id;

  const product = productsData.find(p => p._id === id);
  if (product) fillModal(product);
});

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

  document.querySelector('#rating').innerHTML = generateStars(product.rate);

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

  modal.classList.add('is-open');
  // document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  initColorCheckboxes();

  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('click', handleOverlayClose);
  modal
    .querySelector('[data-modal-close]')
    .addEventListener('click', closeModal);
}

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

document
  .querySelector('.modal-order-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();

    const checkedBox = document.querySelector('.color-checkbox:checked');

    if (!checkedBox) {
      iziToast.warning({
        title: 'Увага',
        message: `Оберіть, будь ласка, колір`,
        position: 'center',
        timeout: 2000,
      });
      return;
    }
    orderData.color = checkedBox.value;

    closeModal();

    openOrderModal();
  });

function closeModal() {
  const modal = document.querySelector('[data-modal]');
  modal.classList.remove('is-open');

  // document.body.classList.remove('modal-open');
  document.body.style.overflow = '';

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
