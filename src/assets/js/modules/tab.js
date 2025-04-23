export function setupTabs() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach((link) => {
    link.addEventListener('click', function () {
      tabLinks.forEach((item) => item.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      this.classList.add('active');

      const tabId = this.getAttribute('data-tab');
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.add('active');
      }
    });
  });
}
