import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs.js';
import { postOrder } from './order-api.js';
import { closeOrderModal } from './handlers.js';
import { orderData } from './modal-furniture.js';
import IMask from 'imask';

const phoneInput = document.getElementById('phone-input');
const maskOptions = {
  mask: '+{38} (000) 000 00 00',
};

const mask = IMask(phoneInput, maskOptions);

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

let orderDetails = orderData;
refs.orderFormEl.addEventListener('submit', event =>
  handleOrderSubmit(event, orderDetails)
);

export async function handleOrderSubmit(event, orderDetails) {
  event.preventDefault();
  if (!refs.orderFormEl.checkValidity()) {
    iziToast.error({
      message: 'Будь ласка, заповніть всі обов’язкові поля.',
      position: 'topRight',
    });
    return;
  }

  const { id, color } = orderData;

  const orderInfo = {
    email: refs.orderFormEl.email.value.trim(),
    phone: refs.orderFormEl.phone.value.trim().replace(/\D/g, ''),
    modelId: id,
    color: color,
    comment: refs.orderFormEl.comment.value.trim(),
  };

  try {
    refs.orderModalLoader.classList.remove('hidden');
    const data = await postOrder(orderInfo);

    if (data) {
      iziToast.success({
        message: 'Заявку успішно надіслано!',
        position: 'topRight',
      });

      closeOrderModal();
    }
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка, спробуйте ще раз',
      position: 'topRight',
    });
    return;
  } finally {
    refs.orderModalLoader.classList.add('hidden');
    closeOrderModal();
  }
}
