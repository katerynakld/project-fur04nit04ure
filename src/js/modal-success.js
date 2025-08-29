import { orderData } from './modal-furniture.js';


export function fillSuccessModal() {
  console.log('Заповнюємо success-modal', orderData);
  const productName = document.getElementById('order-name');
  const productColor = document.getElementById('order-color');
  const orderNumber = document.getElementById('order-number');

  orderNumber.textContent = Math.floor(Math.random() * 9999) + 1;
  productName.textContent = orderData.name;
  productColor.style.backgroundColor = orderData.color;
}