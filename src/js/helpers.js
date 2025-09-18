import starFull from '/img/svg/star-full.svg?raw';
import starHalf from '/img/svg/star-half.svg?raw';
import starEmpty from '/img/svg/star-empty.svg?raw';
import {
  closeOrderModal,
  handleEscClose,
  handleOverlayClose,
} from './order-modal.js';
import { refs } from './refs.js';
import { fillSuccessModal } from './modal-success.js';

export function openOrderModal() {
  refs.orderModalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  refs.orderModalLoader.classList.add('visually-hidden');
  refs.orderFormEl.reset();

  refs.orderModalCloseBtn.addEventListener('click', closeOrderModal);
  refs.orderModalBackdrop.addEventListener('click', handleOverlayClose);
  document.addEventListener('keydown', handleEscClose);
}

export function openSuccessModal() {
  fillSuccessModal();
  refs.successModalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  refs.successModalCloseBtn.addEventListener('click', closeSuccessModal);
  refs.successModalBackdrop.addEventListener('click', handleSuccessOverlayClose);
  document.addEventListener('keydown', handleSuccessEscClose);
}

export function closeSuccessModal() {
  refs.successModalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';

  refs.successModalCloseBtn.removeEventListener('click', closeSuccessModal);
  refs.successModalBackdrop.removeEventListener(
    'click',
    handleSuccessOverlayClose
  );
  document.removeEventListener('keydown', handleSuccessEscClose);
}

function handleSuccessOverlayClose(e) {
  if (e.target.hasAttribute('data-modal')) {
    closeSuccessModal();
  }
}

function handleSuccessEscClose(e) {
  if (e.key === 'Escape') {
    closeSuccessModal();
  }
}

function roundRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) {
    return 3.5;
  } else if (rating >= 3.8 && rating <= 4.2) {
    return 4;
  } else {
    return Math.round(rating * 2) / 2;
  }
}

// Функція генерації SVG зірок
export function generateStars(rating) {
  const roundedRating = roundRating(rating);
  let starsHtml = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      starsHtml += starFull;
    } else if (i - 0.5 === roundedRating) {
      starsHtml += starHalf;
    } else {
      starsHtml += starEmpty;
    }
  }
  return starsHtml;
}
