import { loadHeaderAndFooter } from './modules/headerFooter.js';
import { setupNavToggle } from './modules/navToggle.js';
import { setupTabs } from './modules/tab.js';
import { setupBackToTop } from './modules/backToTop.js';

window.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupBackToTop();
});

window.addEventListener('load', async () => {
  await loadHeaderAndFooter();
  setupNavToggle(); // headerが読み込まれてからでOK
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

  const initialItems = 6;
  const itemsPerLoad = 3;

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

// blog-pagination
document.addEventListener('DOMContentLoaded', () => {
  const blogItems = document.querySelectorAll(
    '#blog-items-container .post-list-grid-item'
  );
  const paginationNav = document.getElementById('pagination-nav');

  const itemsPerPage = 6;
  const totalItems = blogItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = 1;

  // 指定されたページのアイテムを表示し、必要に応じてページの最上部にスクロール
  // shouldScroll を false にするとスクロールしない
  function displayPage(pageNumber, shouldScroll = true) {
    if (pageNumber < 1 || pageNumber > totalPages) {
      console.error('Invalid page number:', pageNumber);
      return;
    }

    blogItems.forEach((item) => {
      item.classList.add('hidden');
    });

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < totalItems; i++) {
      blogItems[i].classList.remove('hidden');
    }

    currentPage = pageNumber;
    updatePaginationLinks(); // リンクの状態を更新

    // --- スクロール処理 ---
    // shouldScroll が true の場合のみページの最上部 (0,0) にスクロール
    if (shouldScroll) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'instant', // 瞬間的に移動
      });
      // もしくは window.scrollTo(0, 0); でも同じ（behaviorオプションなし）
    }
    // --- スクロール処理ここまで ---
  }

  // ページネーションリンクを生成
  function generatePaginationLinks() {
    if (totalPages <= 1) {
      paginationNav.innerHTML = '';
      return;
    }

    const ul = document.createElement('ul');

    // 「前へ」リンク
    const prevLi = document.createElement('li');
    const prevLink = document.createElement('a');
    prevLink.href = '#!'; // JSで処理するリンクの慣習
    prevLink.textContent = '←';
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        displayPage(currentPage - 1, true); // クリック時はスクロールを有効 (true)
      }
    });
    prevLi.appendChild(prevLink);
    ul.appendChild(prevLi);

    // ページ番号リンク
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#!'; // JSで処理するリンクの慣習
      link.textContent = i;
      link.setAttribute('data-page', i);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedPage = parseInt(e.target.getAttribute('data-page'), 10);
        displayPage(clickedPage, true); // クリック時はスクロールを有効 (true)
      });

      li.appendChild(link);
      ul.appendChild(li);
    }

    // 「次へ」リンク
    const nextLi = document.createElement('li');
    const nextLink = document.createElement('a');
    nextLink.href = '#!'; // JSで処理するリンクの慣習
    nextLink.textContent = '→';
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        displayPage(currentPage + 1, true); // クリック時はスクロールを有効 (true)
      }
    });
    nextLi.appendChild(nextLink);
    ul.appendChild(nextLi);

    paginationNav.innerHTML = '';
    paginationNav.appendChild(ul);

    updatePaginationLinks(); // 生成直後のリンク状態を設定
  }

  // ページネーションリンクの状態を更新
  function updatePaginationLinks() {
    // アクティブクラスの更新
    paginationNav.querySelectorAll('a[data-page]').forEach((link) => {
      link.classList.remove('active');
    });
    const currentLink = paginationNav.querySelector(
      `a[data-page="${currentPage}"]`
    );
    if (currentLink) {
      currentLink.classList.add('active');
    }

    // 「前へ」「次へ」リンクの有効/無効クラスを更新
    const prevLi = paginationNav.querySelector('li:first-child');
    if (prevLi) {
      if (currentPage === 1) {
        prevLi.classList.add('disabled');
      } else {
        prevLi.classList.remove('disabled');
      }
    }

    const nextLi = paginationNav.querySelector('li:last-child');
    if (nextLi) {
      if (currentPage === totalPages) {
        nextLi.classList.add('disabled');
      } else {
        nextLi.classList.remove('disabled');
      }
    }
  }

  // 初期設定
  if (totalItems > 0) {
    generatePaginationLinks();
    displayPage(1, false); // 最初のページを表示（初期ロード時はスクロールを無効にするために false を渡す）
  } else {
    generatePaginationLinks(); // アイテムがない場合もリンク生成処理は呼ぶ（ナビゲーションは表示されない）
  }
});
