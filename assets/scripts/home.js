/**
 * DriveLux — Landing Page Interactivity
 * --------------------------------------
 * Renders the DriveLux header via the shared Header component and wires up
 * all interactive behaviour for the car-agency landing page:
 *
 *   1. Header rendering (DriveLux brand + section nav)
 *   2. Scroll-based header style change (shrink/elevate on scroll)
 *   3. Smooth-scroll for all in-page anchor links
 *   4. Car-card "View Details" click handlers
 *   5. Contact form validation + simulated async submission
 *   6. Scroll-reveal animations via IntersectionObserver
 *
 * Everything runs inside a single DOMContentLoaded listener and uses
 * defensive null-checks so missing elements never throw.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================
   * 1. Render the DriveLux header
   * ============================================================ */
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'DriveLux', [
      { label: 'Home', href: '#hero' },
      { label: 'Cars', href: '#featured-cars' },
      { label: 'Services', href: '#services' },
      { label: 'Why Us', href: '#why-us' },
      { label: 'Contact', href: '#contact' }
    ]);
  }

  /* ============================================================
   * 1b. Mobile navigation toggle (hamburger menu)
   *     After renderHeader runs, inject a hamburger <button> into
   *     the header. On mobile (≤768px) the nav is collapsed by
   *     default; clicking the toggle opens/closes it. Clicking a
   *     nav link auto-closes the menu so navigation feels natural.
   *     The button is hidden on desktop via CSS.
   * ============================================================ */
  const headerEl = document.querySelector('#header-container header');
  const navEl = headerEl ? headerEl.querySelector('nav') : null;

  if (headerEl && navEl) {
    // --- Build the hamburger button ---
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle navigation');
    navToggle.setAttribute('aria-expanded', 'false');

    // Three bars form the hamburger icon
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('span');
      bar.className = 'nav-toggle__bar';
      navToggle.appendChild(bar);
    }

    // Insert the toggle as the last child of the header so CSS
    // can place it on the right via flexbox (space-between).
    headerEl.appendChild(navToggle);

    // --- Toggle open / closed on click ---
    navToggle.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // --- Auto-close when a nav link is clicked ---
    const navLinks = navEl.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navEl.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
   * 2. Scroll-based header style change
   *    Adds 'header--scrolled' when the user scrolls past 50px so
   *    CSS can apply a shrink / shadow / background effect.
   *    Uses requestAnimationFrame throttling for performance.
   * ============================================================ */
  const siteHeader = document.querySelector('#header-container header');

  if (siteHeader) {
    let ticking = false;

    const updateHeaderOnScroll = () => {
      if (window.scrollY > 50) {
        siteHeader.classList.add('header--scrolled');
      } else {
        siteHeader.classList.remove('header--scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
      }
    }, { passive: true });

    // Set initial state in case the page loads already scrolled
    updateHeaderOnScroll();
  }

  /* ============================================================
   * 3. Smooth scroll for in-page anchor links
   *    Selects every <a href="#…"> and scrolls to the target
   *    section smoothly. The sticky header offset is handled by
   *    CSS scroll-margin-top on the target sections, so
   *    scrollIntoView({ block: 'start' }) lands correctly.
   * ============================================================ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      // Ignore bare "#" links
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Move focus to the target for accessibility (without re-triggering scroll jump)
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });

  /* ============================================================
   * 4. Car-card "View Details" click handlers
   *    Each .car-card__btn reads the car title from the sibling
   *    .car-card__title and logs / alerts which car was clicked.
   * ============================================================ */
  const carButtons = document.querySelectorAll('.car-card__btn');

  carButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.car-card');
      const titleEl = card ? card.querySelector('.car-card__title') : null;
      const carName = titleEl ? titleEl.textContent.trim() : 'Unknown car';

      console.log(`Car clicked: ${carName}`);
      alert(`You selected the ${carName}. A representative will contact you shortly!`);
    });
  });

  /* ============================================================
   * 5. Contact form handler
   *    Validates name + email, simulates an async submission with
   *    button state changes, then shows a success message and
   *    clears the form.
   * ============================================================ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const submitBtn = document.getElementById('contact-submit');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');

      const nameValue = nameField ? nameField.value.trim() : '';
      const emailValue = emailField ? emailField.value.trim() : '';

      // --- Validation ---
      if (!nameValue || !emailValue) {
        alert('Please fill in the required fields (Name and Email) before submitting.');
        return;
      }

      // Basic email format check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        alert('Please enter a valid email address.');
        if (emailField) emailField.focus();
        return;
      }

      // --- Simulate async submission ---
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Sent ✓';
        }

        // Replace form content with a success message
        contactForm.innerHTML = `
          <div class="contact-form__success" role="status" aria-live="polite">
            <p>Thank you! Your message has been sent. We'll get back to you soon.</p>
          </div>
        `;

        console.log('Contact form submitted successfully.', { name: nameValue, email: emailValue });
      }, 1500);
    });
  }

  /* ============================================================
   * 6. Scroll-reveal animations (IntersectionObserver)
   *    Adds 'is-visible' class to major sections when they enter
   *    the viewport. CSS can define the transition; if it doesn't,
   *    the class is harmless.
   * ============================================================ */
  const revealSelectors = [
    '.featured-cars',
    '.services',
    '.why-us',
    '.testimonials',
    '.contact'
  ];

  const revealSections = document.querySelectorAll(revealSelectors.join(', '));

  if (revealSections.length > 0 && 'IntersectionObserver' in window) {
    // Add the base 'reveal' class for CSS targeting
    revealSections.forEach((section) => section.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
  } else if (revealSections.length > 0) {
    // Fallback for very old browsers: just show everything
    revealSections.forEach((section) => section.classList.add('is-visible'));
  }
});






