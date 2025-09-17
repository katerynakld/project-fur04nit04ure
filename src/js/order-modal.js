import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs.js';
import { postOrder } from './order-api.js';
import { orderData } from './modal-furniture.js';
import IMask from 'imask';
import { openSuccessModal } from './helpers.js';

const phoneInput = document.getElementById('phone-input');
const maskOptions = {
  mask: '+{38} (000) 000 00 00',
};

const mask = IMask(phoneInput, maskOptions);

const submitBtn = document.querySelector('.submit-btn');
refs.orderFormEl.addEventListener('input', () => {
  submitBtn.disabled = !refs.orderFormEl.checkValidity();
});

refs.orderFormEl.addEventListener('submit', event =>
  handleOrderSubmit(event, orderData)
);

export async function handleOrderSubmit(event, orderData) {
  event.preventDefault();
  refs.orderModalLoader.classList.remove('visually-hidden');
  refs.orderFormEl.classList.add('was-validated');

  if (!refs.orderFormEl.checkValidity()) {
    iziToast.error({
      message: 'Будь ласка, заповніть всі обов’язкові поля.',
      position: 'topRight',
    });

    return;
  }

  const rawTelValue = mask.unmaskedValue;

  if (rawTelValue.length !== 12) {
    event.preventDefault();
    phoneInput.setCustomValidity('Будь ласка, введіть правильний телефон.');
    document
      .querySelector('.order-form-input[name="phone"]')
      .classList.add('is-invalid');
    return;
  }

  const { id, color, name } = orderData;

  const orderInfo = {
    // email: refs.orderFormEl.email.value.trim(),
    phone: mask.unmaskedValue,
    modelId: id,
    color,
    name,
    comment: refs.orderFormEl.comment.value.trim(),
  };

  try {
    const data = await postOrder(orderInfo);

    if (data) {
      closeOrderModal();
      openSuccessModal();
    }
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка, спробуйте ще раз',
      position: 'topRight',
    });
  } finally {
    refs.orderModalLoader.classList.add('visually-hidden');
  }
}

export function closeOrderModal() {
  refs.orderModalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  refs.orderFormEl.reset();

  document.removeEventListener('keydown', handleEscClose);
  refs.orderModalCloseBtn.removeEventListener('click', handleOverlayClose);
  refs.orderModalCloseBtn.removeEventListener('click', closeOrderModal);
}

export function handleOverlayClose(e) {
  if (e.target.hasAttribute('data-modal')) {
    closeOrderModal();
  }
}

export function handleEscClose(event) {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
}
