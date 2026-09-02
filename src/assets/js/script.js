import { setupNavToggle } from './modules/navToggle.js';
import { setupBackToTop } from './modules/backToTop.js';

window.addEventListener('DOMContentLoaded', () => {
  setupNavToggle();
  setupBackToTop();

  requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
});

// load-more
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const loadMoreButton = document.getElementById('load-more-button');

  const initialItems = 15;
  const itemsPerLoad = 15;

  let currentlyVisibleItems = initialItems;

  if (portfolioItems.length > initialItems) {
    for (let i = initialItems; i < portfolioItems.length; i++) {
      portfolioItems[i].classList.add('hidden');
    }
  } else {
    if (loadMoreButton) {
      loadMoreButton.style.display = 'none';
    }
  }

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      const nextStartIndex = currentlyVisibleItems;

      const nextEndIndex = currentlyVisibleItems + itemsPerLoad;

      for (
        let i = nextStartIndex;
        i < nextEndIndex && i < portfolioItems.length;
        i++
      ) {
        portfolioItems[i].classList.remove('hidden');
      }

      currentlyVisibleItems = nextEndIndex;

      if (currentlyVisibleItems >= portfolioItems.length) {
        loadMoreButton.style.display = 'none';
      }
    });
  }
});
