import iziToast from 'izitoast';
import { refs } from './refs.js';
import { postOrder } from './order-api.js';
import { closeOrderModal } from './handlers.js';

// refs.orderModalOpenBtn.addEventListener('click', openModal);
refs.orderModalCloseBtn.addEventListener('click', closeOrderModal);
refs.orderModalBackdrop.addEventListener('click', e => {
  if (e.target === refs.orderModalBackdrop) closeOrderModal();
});

document.addEventListener('keydown', e => {
  if (
    e.key === 'Escape' &&
    !refs.orderModalBackdrop.classList.contains('hidden')
  ) {
    closeOrderModal();
  }
});

refs.orderFormEl.addEventListener('submit', async e => {
  e.preventDefault();
  if (!refs.orderFormEl.checkValidity()) {
    iziToast.error({ message: 'Будь ласка, заповніть всі обов’язкові поля.' });
    return;
  }

  let furnitureId = '682f9bbf8acbdf505592ac36';
  let marker = '#ffffff';

  const orderInfo = {
    // _id: '68373276b9cd0c2f44a7744e',
    email: refs.orderFormEl.email.value.trim(),
    phone: refs.orderFormEl.phone.value.trim().replace(/\D/g, ''),
    modelId: furnitureId,
    color: marker,
    comment: refs.orderFormEl.comment.value.trim(),
  };

  refs.orderModalLoader.classList.remove('hidden');

  postOrder(orderInfo);
});
