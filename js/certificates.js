// Certificates page interactive lightbox and FAQ accordion

document.addEventListener('DOMContentLoaded', () => {
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalDownload = document.getElementById('cert-modal-download');

  // Open Lightbox
  document.querySelectorAll('[data-open-cert]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-src');
      const title = trigger.getAttribute('data-title') || 'Official Certificate';
      const download = trigger.getAttribute('data-download') || src;

      if (certModal && certModalImg) {
        certModalImg.src = src;
        certModalTitle.textContent = title;
        if (certModalDownload) {
          certModalDownload.href = download;
          certModalDownload.setAttribute('download', title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg');
        }
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Lightbox
  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
      if (certModalImg) certModalImg.src = '';
    }
  }

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });

  // FAQ accordion
  const faqButtons = document.querySelectorAll('.cert-faq-section .accordion-item');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.panel;
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const isOpen = panel.classList.contains('open');

      document.querySelectorAll('.cert-faq-section .accordion-panel').forEach(p => {
        p.classList.remove('open');
        p.style.maxHeight = null;
      });
      document.querySelectorAll('.cert-faq-section .accordion-item span:last-child').forEach(i => {
        i.textContent = '+';
      });

      if (!isOpen) {
        panel.classList.add('open');
        panel.style.maxHeight = 'none';
        const iconSpan = btn.querySelector('span:last-child');
        if (iconSpan) iconSpan.textContent = '–';
      }
    });
  });
});
