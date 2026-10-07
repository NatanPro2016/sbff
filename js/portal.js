// Simple Clean Portal Script

document.addEventListener('DOMContentLoaded', () => {
  // Preload all modal images in the background so they open instantly
  const imagesToPreload = [
    'assets/1.webp',
    'assets/1.jpeg',
    'assets/IMG_0912.webp',
    'assets/IMG_0912.JPG',
    'assets/broshour.webp',
    'assets/broshour.png',
    'assets/IMG_0916.JPG'
  ];
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // --- Image Modal Elements ---
  const imgModal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const modalSpinner = document.getElementById('modal-spinner');

  // --- Contact Modal Elements ---
  const contactModal = document.getElementById('contact-modal');
  const contactBtn = document.getElementById('btn-contact');
  const contactClose = document.getElementById('contact-close');

  let currentImageLoadId = 0;

  // Open Image Modal without EVER showing previous image
  document.querySelectorAll('[data-img]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || '';

      modalTitle.textContent = title;

      // 1. Immediately wipe out old image and hide it
      modalImg.src = '';
      modalImg.style.display = 'none';

      // 2. Show loading spinner
      if (modalSpinner) {
        modalSpinner.style.display = 'flex';
      }

      // 3. Open modal right away
      imgModal.classList.add('active');

      // 4. Track load session to prevent race conditions
      const thisLoadId = ++currentImageLoadId;

      // 5. Load image in background
      const loader = new Image();
      loader.onload = () => {
        // Only display if the user hasn't clicked another button in the meantime
        if (thisLoadId === currentImageLoadId) {
          modalImg.src = targetSrc;
          modalImg.style.display = 'block';
          if (modalSpinner) modalSpinner.style.display = 'none';
        }
      };
      loader.onerror = () => {
        if (thisLoadId === currentImageLoadId) {
          if (modalSpinner) {
            modalSpinner.innerHTML = '<span>Failed to load image. Please check your connection.</span>';
          }
        }
      };
      loader.src = targetSrc;
    });
  });

  // Close Image Modal
  function closeImgModal() {
    imgModal.classList.remove('active');
    modalImg.src = '';
    modalImg.style.display = 'none';
  }
  if (modalClose) modalClose.addEventListener('click', closeImgModal);
  if (imgModal) {
    imgModal.addEventListener('click', (e) => {
      if (e.target === imgModal) closeImgModal();
    });
  }

  // --- Open & Close Contact Modal ---
  function openContactModal() {
    if (contactModal) contactModal.classList.add('active');
  }
  function closeContactModal() {
    if (contactModal) contactModal.classList.remove('active');
  }
  if (contactBtn) contactBtn.addEventListener('click', openContactModal);
  if (contactClose) contactClose.addEventListener('click', closeContactModal);
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }

  // Escape key closes all open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImgModal();
      closeContactModal();
    }
  });
});
