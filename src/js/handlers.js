//Файл для збереження хендлерів
// function openOrderModal() {
//   refs.orderModalBackdrop.classList.add('is-open');
//   document.body.style.overflow = 'hidden';
// }

import { refs } from './refs';

export function closeOrderModal() {
  refs.orderModalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  refs.orderFormEl.reset();
}
