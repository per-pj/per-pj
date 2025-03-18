const toggleMenu = document.querySelector('.toggle-menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-menu a');

toggleMenu.addEventListener('click', () => {
  toggleMenu.classList.toggle('open'); // トグルメニューのopenクラスを切り替え
  nav.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    toggleMenu.classList.remove('open');
    nav.classList.remove('open');
  });
});
