const scrollButton = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
  scrollButton.classList.toggle('visually-hidden', window.scrollY <= 400);
});

scrollButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  scrollButton.blur();
});
