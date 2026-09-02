export function setupNextProjects() {
  const track = document.querySelector('[data-project-track]');
  const previous = document.querySelector('[data-project-previous]');
  const next = document.querySelector('[data-project-next]');
  if (!track || !previous || !next) return;

  const items = [...track.querySelectorAll('.next-project-item')];
  if (items.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const getPositions = () => {
    const paddingStart = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const trackStart = track.getBoundingClientRect().left;
    return items.map((item) => Math.max(
      0,
      item.getBoundingClientRect().left - trackStart + track.scrollLeft - paddingStart,
    ));
  };
  const getCurrentIndex = (positions) => positions.reduce((closest, position, index) => (
    Math.abs(position - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft)
      ? index
      : closest
  ), 0);
  const updateControls = () => {
    const positions = getPositions();
    const currentIndex = getCurrentIndex(positions);
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === positions.length - 1;
  };
  const move = (direction) => {
    const positions = getPositions();
    const currentIndex = getCurrentIndex(positions);
    const targetIndex = Math.min(Math.max(currentIndex + direction, 0), positions.length - 1);
    track.scrollTo({
      left: positions[targetIndex],
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
}
