// Dashboard page script: render header and add dashboard interactivity
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Calculator Dashboard', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'Dashboard', href: 'dashboard.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  var statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('stat-active');
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      statCards.forEach(function(card) {
        card.classList.remove('stat-active');
      });
    }
  });
});

