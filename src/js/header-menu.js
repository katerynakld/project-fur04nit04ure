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
  }; // Burger menu events

  burger?.addEventListener('click', () => toggleMobileMenu(true));
  closeMenuBtn?.addEventListener('click', () => toggleMobileMenu(false));

  // Змінено: Обробник кліків за межами меню
  document.addEventListener('click', e => {
    // Перевіряємо, чи клік був зроблений поза межами мобільного меню та його кнопки-перемикача
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickInsideToggle = menuToggleContainer.contains(e.target);

    if (
      mobileMenu.classList.contains('active') &&
      !isClickInsideMenu &&
      !isClickInsideToggle
    ) {
      toggleMobileMenu(false);
    }
  }); // Close menu on Escape key

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  }); // Close menu when clicking navigation links

  document
    .querySelectorAll('.mobile-nav-link, .mobile-cta-button')
    .forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    }); // Smooth scroll for anchor links

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }); // Logo click - scroll to top

  const logos = [
    document.getElementById('logo'),
    document.getElementById('mobileLogo'),
  ];
  logos.forEach(logoElement => {
    logoElement?.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
