const tabs = [...document.querySelectorAll('.nav-link')];
const pages = [...document.querySelectorAll('.page')];
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation menu');
}
function navigate(tab, smooth = true) {
  if (!document.getElementById(tab) || !pages.some(p => p.id === tab)) return;
  tabs.forEach(b => {
    const selected = b.dataset.tab === tab;
    b.classList.toggle('active', selected);
    if (selected) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  pages.forEach(p => p.classList.toggle('active', p.id === tab));
  document.getElementById('page-name').textContent = tab.toUpperCase();
  history.replaceState(null, '', '#' + tab);
  closeMenu();
  window.scrollTo({top: 0, behavior: smooth ? 'smooth' : 'instant'});
}
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
tabs.forEach(b => b.addEventListener('click', () => navigate(b.dataset.tab)));
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.go)));
document.querySelector('.mobile-brand')?.addEventListener('click', e => { e.preventDefault(); navigate('home'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('hashchange', () => navigate(location.hash.slice(1) || 'home', false));
document.getElementById('print-resume').addEventListener('click', () => window.print());
document.getElementById('year').textContent = new Date().getFullYear();
navigate(location.hash.slice(1) || 'home', false);
