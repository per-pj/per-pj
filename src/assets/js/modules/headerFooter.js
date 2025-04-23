export async function loadHeaderAndFooter() {
  const headerHtml = await (await fetch('header.html')).text();
  document.getElementById('header-container').innerHTML = headerHtml;

  const footerHtml = await (await fetch('footer.html')).text();
  document.getElementById('footer-container').innerHTML = footerHtml;

  const picksHtml = await (await fetch('picks.html')).text();
  document.getElementById('picks-container').innerHTML = picksHtml;
}
