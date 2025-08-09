//Файл для збереження хендлерів

import { refs } from './refs';

function openOrderModal() {
  refs.orderModalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeOrderModal() {
  refs.orderModalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  refs.orderFormEl.reset();
}
