const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const body = document.body;
const menuToggleContainer = document.querySelector('.menu-toggle-buttons');

const toggleMobileMenu = (open = true) => {
  mobileMenu.classList.toggle('active', open);
  body.classList.toggle('menu-open', open);

  if (open) {
    burger.style.display = 'none';
    closeMenuBtn.style.display = 'flex';
  } else {
    burger.style.display = 'flex';
    closeMenuBtn.style.display = 'none';
  }
};

burger.addEventListener('click', () => {
  toggleMobileMenu(true);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscClose);
});

closeMenuBtn.addEventListener('click', () => {
  toggleMobileMenu(false);
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOutsideClick);
});

document
  .querySelectorAll('.mobile-nav-link, .mobile-cta-button')
  .forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

function handleEscClose(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
    toggleMobileMenu(false);
  }
}

function handleOutsideClick(event) {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickInsideToggle = menuToggleContainer.contains(event.target);

  if (
    mobileMenu.classList.contains('active') &&
    !isClickInsideMenu &&
    !isClickInsideToggle
  ) {
    toggleMobileMenu(false);
  }
}
