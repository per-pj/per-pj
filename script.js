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
