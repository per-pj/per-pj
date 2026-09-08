const PAGE_SIZE = 9;

export function setupWorksControls() {
  document.querySelectorAll('[data-works-list]').forEach((list) => {
    const grid = list.querySelector('[data-works-grid]');
    if (!grid) return;

    const items = [...grid.querySelectorAll('.portfolio-item')];
    const filterButtons = [...list.querySelectorAll('[data-market-filter]')];
    const sortSelect = list.querySelector('[data-works-sort]');
    const loadMoreButton = list.querySelector('[data-load-more]');
    const status = list.querySelector('[data-works-status]');
    let activeMarket = 'all';
    let visibleCount = PAGE_SIZE;

    const update = () => {
      const direction = sortSelect?.value === 'oldest' ? 1 : -1;
      const sortedItems = [...items].sort((a, b) =>
        a.dataset.releaseDate.localeCompare(b.dataset.releaseDate) * direction,
      );
      sortedItems.forEach((item) => grid.append(item));

      const matchingItems = sortedItems.filter(
        (item) => activeMarket === 'all' || item.dataset.market === activeMarket,
      );
      sortedItems.forEach((item) => item.classList.add('hidden'));
      matchingItems.slice(0, visibleCount).forEach((item) => item.classList.remove('hidden'));

      if (loadMoreButton) {
        loadMoreButton.hidden = matchingItems.length <= visibleCount;
      }
      if (status) {
        status.textContent = `${matchingItems.length}件中${Math.min(visibleCount, matchingItems.length)}件を表示`;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeMarket = button.dataset.marketFilter;
        visibleCount = PAGE_SIZE;
        filterButtons.forEach((candidate) => {
          const isActive = candidate === button;
          candidate.classList.toggle('is-active', isActive);
          candidate.setAttribute('aria-pressed', String(isActive));
        });
        update();
      });
    });

    sortSelect?.addEventListener('change', () => {
      visibleCount = PAGE_SIZE;
      update();
    });

    loadMoreButton?.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      update();
    });

    update();
  });
}
