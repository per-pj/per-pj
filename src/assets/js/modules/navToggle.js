export function setupNavToggle() {
  const toggleMenu = document.querySelector('.toggle-menu');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (toggleMenu && nav && navLinks.length > 0) {
    toggleMenu.addEventListener('click', () => {
      toggleMenu.classList.toggle('open');
      nav.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }
}
