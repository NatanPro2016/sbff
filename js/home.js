// Home interactions: static testimonials + accordion

document.addEventListener('DOMContentLoaded', () => {
  // Partner accordion
  const buttons = document.querySelectorAll('.accordion-item');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.panel;
      const panel = document.getElementById(panelId);
      const isOpen = panel.classList.contains('open');

      document.querySelectorAll('.accordion-panel').forEach(p => {
        p.classList.remove('open');
        p.style.maxHeight = null;
      });
      document.querySelectorAll('.accordion-item span:last-child').forEach(i => i.textContent = '+');

      if (!isOpen) {
        panel.classList.add('open');
        panel.style.maxHeight = 'none';
        btn.querySelector('span:last-child').textContent = '–';
      }
    });
  });
});
