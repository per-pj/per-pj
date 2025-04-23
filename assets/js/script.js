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
