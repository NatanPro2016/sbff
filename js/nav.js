document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navActions = document.querySelector('.nav-actions');

  if (!toggle || !navActions) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navActions.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    navActions.classList.toggle('is-open', !isOpen);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
});
