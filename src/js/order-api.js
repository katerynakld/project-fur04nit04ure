import axios from 'axios';
import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://furniture-store.b.goit.study/api';



export async function postOrder(orderInfo) {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderInfo, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}