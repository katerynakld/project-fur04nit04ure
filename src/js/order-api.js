import axios from 'axios';
import { refs } from './refs';
import iziToast from 'izitoast';
import { closeOrderModal } from './handlers';

const BASE_URL = 'https://furniture-store.b.goit.study/api';

export async function postOrder(orderInfo) {
  console.log(orderInfo);
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    iziToast.show({
      message: 'Заявку успішно надіслано!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#ffffff',
    });
    closeOrderModal();

    // Optionally log the response if you want
    console.log('Order created:', response.data);
  } catch (err) {
    if (err.response) {
      console.error('Error response:', err.response);
      iziToast.error({
        message: err.response.data?.message || 'Сталася помилка',
      });
    } else {
      console.error('Unknown error:', err);
      iziToast.error({ message: 'Сталася помилка' });
    }
  } finally {
    refs.orderModalLoader.classList.add('hidden');
  }
}
