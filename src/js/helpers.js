import starFull from '../img/svg/star-full.svg?url';
import starHalf from '../img/svg/star-half.svg?url';
import starEmpty from '../img/svg/star-empty.svg?url';

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
      starsHtml += `<svg class="star" width="16" height="16"><use href=${starFull} width="16" height="16"></use></svg>`;
    } else if (i - 0.5 === roundedRating) {
      starsHtml += `<svg class="star" width="16" height="16"><use href=${starHalf} width="16" height="16"></use></svg>`;
    } else {
      starsHtml += `<svg class="star" width="16" height="16"><use href=${starEmpty} width="16" height="16"></use></svg>`;
    }
  }
  return starsHtml;
}
