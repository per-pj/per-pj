import { setupNavToggle } from './modules/navToggle.js';
import { setupTabs } from './modules/tab.js';
import { setupBackToTop } from './modules/backToTop.js';

window.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupBackToTop();
});

// share
document.addEventListener('DOMContentLoaded', function () {
  const copyLinkElements = document.querySelectorAll('.copy-trigger');

  if (copyLinkElements.length > 0) {
    copyLinkElements.forEach(function (copyLinkElement) {
      copyLinkElement.addEventListener('click', function () {
        const articleUrl = window.location.href;

        navigator.clipboard
          .writeText(articleUrl)
          .then(() => {
            console.log('記事のリンクをコピーしました！');

            const originalText = copyLinkElement.textContent;
            copyLinkElement.textContent = 'リンクをコピーしました🎉';

            setTimeout(() => {
              copyLinkElement.textContent = originalText;
            }, 2000);
          })
          .catch((err) => {
            console.error('リンクのコピーに失敗しました:', err);
            alert(
              'リンクのコピーに失敗しました。手動でコピーしてください。\n' +
                articleUrl
            );
          });
      });
    });
  }
});

// load-more
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const loadMoreButton = document.getElementById('load-more-button');

  const initialItems = 9;
  const itemsPerLoad = 6;

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

// faq
document.querySelectorAll('.faq-question').forEach((item) => {
  item.addEventListener('click', () => {
    const answer = item.nextElementSibling;
    const toggle = item.querySelector('.toggle');

    answer.classList.toggle('open');
    item.parentNode.classList.toggle('open');

    toggle.textContent = answer.classList.contains('open') ? '×' : '+';
  });
});
