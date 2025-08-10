import starFull from '/img/svg/star-full.svg?raw';
import starHalf from '/img/svg/star-half.svg?raw';
import starEmpty from '/img/svg/star-empty.svg?raw';

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
