export function setupBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');

  if (!backToTopButton) return;

  window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.pageYOffset > 100 ? 'block' : 'none';
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
