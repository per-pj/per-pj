import { setupNavToggle } from './modules/navToggle.js';
import { setupBackToTop } from './modules/backToTop.js';
import { setupNextProjects } from './modules/nextProjects.js';
import { setupWorksControls } from './modules/worksControls.js';

window.addEventListener('DOMContentLoaded', () => {
  setupNavToggle();
  setupBackToTop();
  setupNextProjects();
  setupWorksControls();

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
