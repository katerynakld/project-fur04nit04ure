import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import starFull from '/img/svg/star-full.svg?raw';
import starHalf from '/img/svg/star-half.svg?raw';
import starEmpty from '/img/svg/star-empty.svg?raw';

class FeedbackSlider {
  constructor() {
    this.swiper = null;
    this.feedbacks = [];
    this.container = document.querySelector('.feedback-swiper'); // scope here
    this.wrapper = this.container.querySelector('.swiper-wrapper');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
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
          params: { limit: 10, page: 1 },
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
    this.wrapper.innerHTML =
      '<div class="loading">Завантаження відгуків...</div>';
  }

  showError() {
    this.wrapper.innerHTML =
      '<div class="error">Помилка завантаження відгуків. Спробуйте пізніше.</div>';
  }

  roundRating(rating) {
    if (rating >= 3.3 && rating <= 3.7) return 3.5;
    if (rating >= 3.8 && rating <= 4.2) return 4;
    return Math.round(rating * 2) / 2;
  }

  generateStars(rating) {
    const roundedRating = this.roundRating(rating);
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) starsHtml += starFull;
      else if (i - 0.5 === roundedRating) starsHtml += starHalf;
      else starsHtml += starEmpty;
    }
    return starsHtml;
  }

  renderFeedbacks() {
    this.wrapper.innerHTML = this.feedbacks
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
  }

  initSwiper() {
    this.swiper = new Swiper(this.container, {
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
        nextEl: this.nextBtn,
        prevEl: this.prevBtn,
      },
      breakpoints: {
        768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
      },
      on: {
        init: () => this.updateNavigationButtons(),
        slideChange: () => this.updateNavigationButtons(),
        reachBeginning: () => this.updateNavigationButtons(),
        reachEnd: () => this.updateNavigationButtons(),
      },
    });
  }

  updateNavigationButtons() {
    if (!this.swiper) return;

    if (this.swiper.isBeginning) {
      this.prevBtn.classList.add('disabled');
      this.prevBtn.setAttribute('disabled', 'true');
    } else {
      this.prevBtn.classList.remove('disabled');
      this.prevBtn.removeAttribute('disabled');
    }

    if (this.swiper.isEnd) {
      this.nextBtn.classList.add('disabled');
      this.nextBtn.setAttribute('disabled', 'true');
    } else {
      this.nextBtn.classList.remove('disabled');
      this.nextBtn.removeAttribute('disabled');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FeedbackSlider();
});
