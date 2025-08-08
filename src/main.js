import Swiper from 'swiper';
import 'swiper/css';
import axios from 'axios';

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
           
            // Заміни на твій API endpoint
            const response = await axios.get('https://furniture-store.b.goit.study/api/feedbacks', {
                params: {
                    limit: 10,
                    page: 1
                }
            });
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
        swiperWrapper.innerHTML = '<div class="loading">Завантаження відгуків...</div>';
    }
    showError() {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '<div class="error">Помилка завантаження відгуків. Спробуйте пізніше.</div>';
    }
    roundRating(rating) {
        if (rating >= 3.3 && rating <= 3.7) {
            return 3.5;
        } else if (rating >= 3.8 && rating <= 4.2) {
            return 4;
        } else {
            return Math.round(rating * 2) / 2; // Округлення до 0.5
        }
    }
    generateStars(rating) {
        const roundedRating = this.roundRating(rating);
        let starsHtml = '';
       
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                starsHtml += `<svg class="star"><use href="#star-full"></use></svg>`;
            } else if (i - 0.5 === roundedRating) {
                starsHtml += `<svg class="star"><use href="#star-half"></use></svg>`;
            } else {
                starsHtml += `<svg class="star empty"><use href="#star-empty"></use></svg>`;
            }
        }
       
        return starsHtml;
    }
    renderFeedbacks() {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
       
        const feedbacksHtml = this.feedbacks.map(feedback => `
            <div class="swiper-slide">
                <div class="feedback-card">
                    <div class="star-rating">
                        ${this.generateStars(feedback.rate)}
                    </div>
                    <div class="feedback-text">${feedback.descr}</div>
                    <div class="feedback-author">${feedback.name}</div>
                </div>
            </div>
        `).join('');
        swiperWrapper.innerHTML = feedbacksHtml;
    }
    initSwiper() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        this.swiper = new Swiper('.feedback-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            grabCursor: true,
           
            pagination: {
                el: '.feedback-pagination',
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
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
                }
            }
        });
        // Ініціальне оновлення кнопок
        this.updateNavigationButtons();
        // Додавання обробників подій для кнопок навігації
        prevBtn.addEventListener('click', () => {
            if (!prevBtn.classList.contains('disabled')) {
                this.swiper.slidePrev();
            }
        });
        nextBtn.addEventListener('click', () => {
            if (!nextBtn.classList.contains('disabled')) {
                this.swiper.slideNext();
            }
        });
    }
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        // Оновлення стану кнопки "Назад"
        if (this.swiper.isBeginning) {
            prevBtn.classList.add('disabled');
            prevBtn.setAttribute('disabled', 'true');
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.removeAttribute('disabled');
        }
        // Оновлення стану кнопки "Вперед"
        if (this.swiper.isEnd) {
            nextBtn.classList.add('disabled');
            nextBtn.setAttribute('disabled', 'true');
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.removeAttribute('disabled');
        }
    }
}
// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackSlider();
});