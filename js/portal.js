// Simple Clean Portal Script

document.addEventListener('DOMContentLoaded', () => {
  const imgModal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  const feedbackModal = document.getElementById('feedback-modal');
  const feedbackBtn = document.getElementById('btn-feedback');
  const feedbackClose = document.getElementById('feedback-close');
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackDone = document.getElementById('feedback-done');
  const feedbackDoneClose = document.getElementById('feedback-done-close');
  const stars = document.querySelectorAll('.feedback-stars button');

  // Open Image Modal
  document.querySelectorAll('[data-img]').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || '';
      modalImg.src = src;
      modalTitle.textContent = title;
      imgModal.classList.add('active');
    });
  });

  // Close Image Modal
  function closeImgModal() {
    imgModal.classList.remove('active');
  }
  if (modalClose) modalClose.addEventListener('click', closeImgModal);
  if (imgModal) {
    imgModal.addEventListener('click', (e) => {
      if (e.target === imgModal) closeImgModal();
    });
  }

  // Open Feedback Modal
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
      feedbackForm.style.display = 'block';
      feedbackDone.style.display = 'none';
      feedbackModal.classList.add('active');
    });
  }

  // Close Feedback Modal
  function closeFeedbackModal() {
    feedbackModal.classList.remove('active');
  }
  if (feedbackClose) feedbackClose.addEventListener('click', closeFeedbackModal);
  if (feedbackDoneClose) feedbackDoneClose.addEventListener('click', closeFeedbackModal);
  if (feedbackModal) {
    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) closeFeedbackModal();
    });
  }

  // Star Rating Click
  let rating = 5;
  stars.forEach(btn => {
    btn.addEventListener('click', () => {
      rating = parseInt(btn.getAttribute('data-star'), 10);
      stars.forEach(b => {
        const val = parseInt(b.getAttribute('data-star'), 10);
        b.classList.toggle('active', val <= rating);
      });
    });
  });

  // Feedback Form Submit
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      feedbackForm.style.display = 'none';
      feedbackDone.style.display = 'block';
    });
  }

  // Escape key closes both
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImgModal();
      closeFeedbackModal();
    }
  });
});
