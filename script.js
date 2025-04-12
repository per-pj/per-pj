const toggleMenu = document.querySelector('.toggle-menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-menu a');

if (toggleMenu && nav && navLinks) {
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
}

async function loadHeaderAndFooter() {
  const headerResponse = await fetch('header.html');
  const headerHtml = await headerResponse.text();
  document.getElementById('header-container').innerHTML = headerHtml;

  const footerResponse = await fetch('footer.html');
  const footerHtml = await footerResponse.text();
  document.getElementById('footer-container').innerHTML = footerHtml;

  // ヘッダーとフッターが読み込まれた後に、再度 DOM要素を取得してイベントリスナーを設定する
  const updatedToggleMenu = document.querySelector('.toggle-menu');
  const updatedNav = document.querySelector('.nav');
  const updatedNavLinks = document.querySelectorAll('.nav-menu a');

  if (updatedToggleMenu && updatedNav && updatedNavLinks) {
    updatedToggleMenu.addEventListener('click', () => {
      updatedToggleMenu.classList.toggle('open');
      updatedNav.classList.toggle('open');
    });

    updatedNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        updatedToggleMenu.classList.remove('open');
        updatedNav.classList.remove('open');
      });
    });
  }
}

// ページ読み込み時にヘッダーとフッターをロード
window.addEventListener('load', loadHeaderAndFooter);

document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // すべてのタブリンクからactiveクラスを削除
      tabLinks.forEach((item) => item.classList.remove('active'));
      // すべてのタブコンテンツからactiveクラスを削除
      tabContents.forEach((content) => content.classList.remove('active'));

      // クリックしたタブリンクにactiveクラスを追加
      this.classList.add('active');

      // data-tab属性から対象のタブコンテンツのIDを取得し表示
      const tabId = this.getAttribute('data-tab');
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add('active');
      }
    });
  });
});

const backToTopButton = document.getElementById('back-to-top');

// スクロールが一定量を超えたらボタンを表示
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// ボタンがクリックされたらページトップへスムーズスクロール
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
