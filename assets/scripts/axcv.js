document.addEventListener('DOMContentLoaded', () => {
  // Initialize header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer && typeof Header !== 'undefined') {
    headerContainer.innerHTML = Header.render('AXCv');
    Header.init();
  }

  // Add any AXCv-specific functionality here
  console.log('AXCv page loaded');
});

