const themeBtn = document.querySelector('.theme-btn-js');
const html = document.documentElement;
  const storageKey = 'user-theme';
  const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)');

window.addEventListener('load', windowLoad);

function windowLoad(){
  let savedTheme = localStorage.getItem(storageKey);

  function setTheme(theme) {
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }

  function applyTheme() {
    setTheme(savedTheme || (prefersTheme.matches ? 'dark' : 'light'));
  }

  prefersTheme.addEventListener('change', () => {
    if (!savedTheme) applyTheme();
  });

    themeBtn?.addEventListener('click', () => {
    const current = html.classList.contains('light') ? 'light' : 'dark';
    const newTheme = current === 'light' ? 'dark' : 'light';


    if (newTheme === (prefersTheme.matches ? 'dark' : 'light')) {
      localStorage.removeItem(storageKey);
      savedTheme = null;
    } else {
      localStorage.setItem(storageKey, newTheme);
      savedTheme = newTheme;
    }
    themeBtn.blur();
    applyTheme();
  });


  applyTheme();
}