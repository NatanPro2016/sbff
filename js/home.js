// Home interactions: testimonial carousel with fade + accordion

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial carousel
  const track = document.querySelector('.section-div1');
  const shellParent = document.querySelector('.section1');
  if (track && shellParent) {
    const cards = Array.from(track.children);
    if (cards.length) {
      // build carousel DOM
      const shell = document.createElement('div');
      shell.className = 'testimonial-shell';
      const innerTrack = document.createElement('div');
      innerTrack.className = 'testimonial-track';
      cards.forEach(c => innerTrack.appendChild(c.cloneNode(true)));
      cards.forEach(c => innerTrack.appendChild(c.cloneNode(true))); // duplicate for loop
      const fadeL = document.createElement('div'); fadeL.className = 'fade fade-left';
      const fadeR = document.createElement('div'); fadeR.className = 'fade fade-right';
      shell.appendChild(fadeL); shell.appendChild(fadeR); shell.appendChild(innerTrack);
      track.innerHTML = '';
      track.appendChild(shell);

      let idx = 0;
      let cardWidth = 320;
      const gap = 18;
      const updateWidth = () => {
        const card = innerTrack.querySelector('.card-div');
        if (card) {
          const rect = card.getBoundingClientRect();
          cardWidth = rect.width + gap;
        }
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);

      const advance = () => {
        idx += 1;
        innerTrack.style.transition = 'transform 0.8s ease';
        innerTrack.style.transform = `translateX(-${idx * cardWidth}px)`;
        if (idx >= cards.length) {
          setTimeout(() => {
            innerTrack.style.transition = 'none';
            idx = 0;
            innerTrack.style.transform = 'translateX(0)';
          }, 820);
        }
      };

      let timer = setInterval(advance, 3500);
      shell.addEventListener('mouseenter', () => clearInterval(timer));
      shell.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(advance, 3500); });
    }
  }

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
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.querySelector('span:last-child').textContent = '–';
      }
    });
  });
});
