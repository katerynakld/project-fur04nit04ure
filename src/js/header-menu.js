document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenu');
  const body = document.body;
  const menuToggleContainer = document.querySelector('.menu-toggle-buttons'); // Mobile menu toggle

  const toggleMobileMenu = (open = true) => {
    mobileMenu.classList.toggle('active', open);
    body.classList.toggle('menu-open', open); // Керування видимістю кнопок

    if (open) {
      burger.style.display = 'none';
      closeMenuBtn.style.display = 'flex';
    } else {
      burger.style.display = 'flex';
      closeMenuBtn.style.display = 'none';
    }
  };

  burger?.addEventListener('click', () => toggleMobileMenu(true));
  closeMenuBtn?.addEventListener('click', () => {
    toggleMobileMenu(false);
    document.removeEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
    document.removeEventListener('click', e => {
      const isClickInsideMenu = mobileMenu.contains(e.target);
      const isClickInsideToggle = menuToggleContainer.contains(e.target);
      if (
        mobileMenu.classList.contains('active') &&
        !isClickInsideMenu &&
        !isClickInsideToggle
      ) {
        toggleMobileMenu(false);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  });

  document.addEventListener('click', e => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickInsideToggle = menuToggleContainer.contains(e.target);

    if (
      mobileMenu.classList.contains('active') &&
      !isClickInsideMenu &&
      !isClickInsideToggle
    ) {
      toggleMobileMenu(false);
    }
  });

  document
    .querySelectorAll('.mobile-nav-link, .mobile-cta-button')
    .forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
});
