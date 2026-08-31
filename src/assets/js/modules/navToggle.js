export function setupNavToggle() {
  const toggleMenu = document.querySelector('.toggle-menu');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (!toggleMenu || !nav || navLinks.length === 0) return;

  const setMenuState = (isOpen) => {
    toggleMenu.classList.toggle('open', isOpen);
    nav.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    toggleMenu.setAttribute('aria-expanded', String(isOpen));
    toggleMenu.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  };

  toggleMenu.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('open'));
  });

  navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  nav.addEventListener('click', (event) => {
    if (event.target === nav) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuState(false);
      toggleMenu.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) setMenuState(false);
  });
}
