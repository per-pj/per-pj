// ファイルの先頭（例: ./modules/navToggle.js）
console.log('--- トグルメニューJSファイルが読み込まれました ---');

// ★ SyntaxError を解消するため、関数定義の前に 'export' キーワードを追加
export function setupNavToggle() {
  // ここに export を追加
  console.log('--- setupNavToggle 関数が呼び出されました ---');

  const toggleMenu = document.querySelector('.toggle-menu');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-menu a');

  console.log('--- 要素の取得結果 ---', { toggleMenu, nav, navLinks });

  // ★ 要素が全て見つかったかの条件チェック
  if (toggleMenu && nav && navLinks.length > 0) {
    console.log(
      '--- トグルに必要な要素が全て見つかりました。イベントリスナーを設定します ---'
    );

    // トグルメニュー（ハンバーガーアイコン）のクリックイベント
    toggleMenu.addEventListener('click', () => {
      console.log('--- ハンバーガーアイコンがクリックされました ---'); // クリックされた時のログ
      toggleMenu.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // ナビゲーションリンク（メニュー項目）のクリックイベント
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        console.log('--- ナビゲーションリンクがクリックされました ---'); // クリックされた時のログ
        toggleMenu.classList.remove('open'); // メニューを閉じる
        nav.classList.remove('open'); // メニューを閉じる
      });
    });

    console.log('--- イベントリスナーの設定が完了しました ---');
  } else {
    console.log('--- トグルに必要な要素が見つかりませんでした ---');
    // どの要素が見つからなかったかを確認するために、ここで要素の状態を再度ログ出力するのも有効です
    // console.log('取得失敗:', { toggleMenu, nav, navLinks });
  }
}

// ★ このファイル自身がエントリポイントとして機能し、DOMの準備ができた後に実行したい場合、
//    DOMContentLoaded リスナーの中で関数を呼び出します。
//    もし別のファイルから import されて、そちらで呼び出される場合は、このリスナーブロックは不要です。
//    エラーメッセージから ./modules/... とあるので、モジュールとしてimportされている可能性が高いですが、
//    同時にこのファイル内で呼び出したい意図も見えるため、両方のパターンが考えられます。
//    ここでは、提供いただいたコード構造に合わせて、DOMContentLoaded 内で呼び出す形を維持します。
document.addEventListener('DOMContentLoaded', () => {
  console.log('--- DOMContentLoaded イベントが発生しました ---');

  // DOMの準備ができた後に、setupNavToggle 関数を実行する
  setupNavToggle();
});

// --- ファイルの他のコード（あれば） ---
