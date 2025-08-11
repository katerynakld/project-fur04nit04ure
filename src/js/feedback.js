import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import starFull from '../img/svg/star-full.svg';
import starHalf from '../img/svg/star-half.svg';
import starEmpty from '../img/svg/star-empty.svg';

class FeedbackSlider {
  constructor() {
    this.swiper = null;
    this.feedbacks = [];
    this.init();
  }
  init() {
    this.loadFeedbacks();
  }
  async loadFeedbacks() {
    try {
      this.showLoading();
      const response = await axios.get(
        'https://furniture-store.b.goit.study/api/feedbacks',
        {
          params: {
            limit: 10,
            page: 1,
          },
        }
      );
      this.feedbacks = response.data.feedbacks;
      this.renderFeedbacks();
      this.initSwiper();
    } catch (error) {
      console.error('Помилка завантаження відгуків:', error);
      this.showError();
    }
  }
  showLoading() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML =
      '<div class="loading">Завантаження відгуків...</div>';
  }
  showError() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML =
      '<div class="error">Помилка завантаження відгуків. Спробуйте пізніше.</div>';
  }
  roundRating(rating) {
    if (rating >= 3.3 && rating <= 3.7) {
      return 3.5;
    } else if (rating >= 3.8 && rating <= 4.2) {
      return 4;
    } else {
      return Math.round(rating * 2) / 2;
    }
  }
  generateStars(rating) {
    const roundedRating = this.roundRating(rating);
    let starsHtml = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        starsHtml += `<svg class="star" width="20" height="20"><use href=${starFull}></use></svg>`;
      } else if (i - 0.5 === roundedRating) {
        starsHtml += `<svg class="star" width="20" height="20"><use href=${starHalf}></use></svg>`;
      } else {
        starsHtml += `<svg class="star" width="20" height="20"><use href=${starEmpty}></use></svg>`;
      }
    }
    return starsHtml;
  }
  renderFeedbacks() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    const feedbacksHtml = this.feedbacks
      .map(
        feedback => `
            <div class="swiper-slide">
                <div class="feedback-card">
                    <div class="star-rating">
                        ${this.generateStars(feedback.rate)}
                    </div>
                    <div class="feedback-text">"${feedback.descr}"</div>
                    <div class="feedback-author">${feedback.name}</div>
                </div>
            </div>
        `
      )
      .join('');
    swiperWrapper.innerHTML = feedbacksHtml;
  }
  initSwiper() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    this.swiper = new Swiper('.feedback-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      loop: false,
      grabCursor: true,

      pagination: {
        el: '.feedback-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
      },
      on: {
        slideChange: () => {
          this.updateNavigationButtons();
        },
        reachBeginning: () => {
          this.updateNavigationButtons();
        },
        reachEnd: () => {
          this.updateNavigationButtons();
        },
      },
    });
    this.updateNavigationButtons();
  }
  updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (this.swiper.isBeginning) {
      prevBtn.classList.add('disabled');
      prevBtn.setAttribute('disabled', 'true');
    } else {
      prevBtn.classList.remove('disabled');
      prevBtn.removeAttribute('disabled');
    }

    if (this.swiper.isEnd) {
      nextBtn.classList.add('disabled');
      nextBtn.setAttribute('disabled', 'true');
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.removeAttribute('disabled');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FeedbackSlider();
});
