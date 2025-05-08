console.log('--- トグルメニューJSファイルが読み込まれました ---');

export function setupNavToggle() {
  console.log('--- setupNavToggle 関数が呼び出されました ---');

  const toggleMenu = document.querySelector('.toggle-menu');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-menu a');

  console.log('--- 要素の取得結果 ---', { toggleMenu, nav, navLinks });

  if (toggleMenu && nav && navLinks.length > 0) {
    console.log(
      '--- トグルに必要な要素が全て見つかりました。イベントリスナーを設定します ---'
    );

    toggleMenu.addEventListener('click', () => {
      console.log('--- ハンバーガーアイコンがクリックされました ---');
      toggleMenu.classList.toggle('open');
      nav.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        console.log('--- ナビゲーションリンクがクリックされました ---');
        toggleMenu.classList.remove('open');
        nav.classList.remove('open');
      });
    });

    console.log('--- イベントリスナーの設定が完了しました ---');
  } else {
    console.log('--- トグルに必要な要素が見つかりませんでした ---');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('--- DOMContentLoaded イベントが発生しました ---');

  setupNavToggle();
});
