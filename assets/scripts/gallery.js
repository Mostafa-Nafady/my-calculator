/**
 * Gallery page initialization script.
 * Renders the shared header via renderHeader() and sets up modal overlay
 * behavior for gallery cards — click-to-open, close on overlay click,
 * close button click, or Escape key press.
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Calculator Gallery', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'Gallery', href: 'gallery.html' }
    ]);
  }

  var modalOverlay = document.getElementById('modal-overlay');
  var modalTitle = document.getElementById('modal-title');
  var modalDesc = document.getElementById('modal-desc');
  var modalLink = document.getElementById('modal-link');
  var modalClose = document.getElementById('modal-close');

  var cards = document.querySelectorAll('.gallery-card');
  cards.forEach(function(card) {
    card.addEventListener('click', function(event) {
      // Ignore clicks that originate from the card link itself
      if (event.target.classList.contains('card-link')) {
        return;
      }

      var calcName = card.getAttribute('data-calc') || '';
      var titleEl = card.querySelector('.card-title');
      var descEl = card.querySelector('.card-desc');
      var linkEl = card.querySelector('.card-link');

      modalTitle.textContent = titleEl ? titleEl.textContent : calcName;
      modalDesc.textContent = descEl ? descEl.textContent : '';
      if (linkEl) {
        modalLink.setAttribute('href', linkEl.getAttribute('href'));
      }

      modalOverlay.classList.remove('hidden');
    });
  });

  /**
   * Hides the modal overlay by adding the 'hidden' CSS class to the
   * modal overlay element, effectively closing the modal dialog.
   *
   * @function closeModal
   * @description Adds the 'hidden' class to `modalOverlay` to hide the modal.
   * @returns {void}
   */
  function closeModal() {
    modalOverlay.classList.add('hidden');
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(event) {
      // Only close when the overlay itself (outside the content) is clicked
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  var modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});



