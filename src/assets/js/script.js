import { setupNavToggle } from './modules/navToggle.js';
import { setupBackToTop } from './modules/backToTop.js';
import { setupNextProjects } from './modules/nextProjects.js';
import { setupWorksControls } from './modules/worksControls.js';

function initializeSite() {
  setupNavToggle();
  setupBackToTop();
  setupNextProjects();
  setupWorksControls();

  const root = document.documentElement;
  root.classList.add('is-motion-ready');
  requestAnimationFrame(() => root.classList.add('is-ready'));

  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealInViewport = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains('is-visible')) return;

      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight - 24 && bounds.bottom > 0) {
        item.classList.add('is-visible');
      }
    });
  };

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

  const scheduleReveal = () => requestAnimationFrame(revealInViewport);
  window.addEventListener('scroll', scheduleReveal, { passive: true });
  window.addEventListener('resize', scheduleReveal);
  window.addEventListener('click', scheduleReveal);
  window.addEventListener('change', scheduleReveal);
  scheduleReveal();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeSite, { once: true });
} else {
  initializeSite();
}
