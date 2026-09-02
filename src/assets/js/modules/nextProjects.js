export function setupNextProjects() {
  const track = document.querySelector('[data-project-track]');
  const previous = document.querySelector('[data-project-previous]');
  const next = document.querySelector('[data-project-next]');
  if (!track || !previous || !next) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const getStep = () => {
    const item = track.querySelector('.next-project-item');
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
  };
  const updateControls = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll - 2;
  };
  const move = (direction) => track.scrollBy({
    left: direction * getStep(),
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
  });

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
}
