/**
 * store.js — Interactivity for the Little Sprout baby-store.html landing page.
 *
 * Loaded with `defer`, so the DOM is fully parsed before this script runs.
 * Implements: mobile nav toggle, add-to-cart counter with toast, newsletter
 * form validation, smooth-scroll for in-page anchors, and a back-to-top button.
 *
 * @author Little Sprout
 */

(function () {
  'use strict';

  /* ============================================================
   *  Constants & helpers
   * ============================================================ */

  /** Basic email validation regex (good enough for client-side UX). */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** How long the toast stays visible (ms). */
  const TOAST_TIMEOUT = 2500;

  /** Scroll threshold (px) at which the back-to-top button appears. */
  const BACK_TO_TOP_THRESHOLD = 400;

  /** Reference to the sticky header (used for scroll offset). */
  const siteHeader = document.getElementById('site-header');

  /**
   * Compute the current height of the sticky header so that smooth-scroll
   * targets are not hidden behind it.
   * @returns {number} Header height in pixels (0 if header is absent).
   */
  const getHeaderHeight = () => (siteHeader ? siteHeader.offsetHeight : 0);

  /* ============================================================
   *  Toast notification (idempotent, created on demand)
   * ============================================================ */

  /**
   * Return the toast element, creating it if it does not yet exist.
   * The element is a <div id="toast" class="toast"> appended to <body>.
   * @returns {HTMLDivElement} The toast element.
   */
  const getToast = () => {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    return toast;
  };

  /** Timer reference so rapid calls reset the hide delay. */
  let toastTimer = null;

  /**
   * Show a toast message. Creates the toast element if needed, sets its text,
   * adds the `.show` class, and auto-hides after TOAST_TIMEOUT ms.
   * @param {string} message - The message to display (may include emoji).
   */
  const showToast = (message) => {
    const toast = getToast();
    toast.textContent = message;

    // Reset any pending hide so back-to-back toasts stay visible.
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    // Force reflow so re-showing is animated even if already visible.
    toast.classList.remove('show');
    void toast.offsetWidth; // eslint-disable-line no-unused-expressions
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, TOAST_TIMEOUT);
  };

  /* ============================================================
   *  1. Mobile navigation toggle
   * ============================================================ */

  /**
   * Wire up the hamburger button (#nav-toggle) to open/close the mobile nav
   * (#mobile-nav). Toggles `.open`, the `hidden` attribute, and `aria-expanded`.
   * Also closes the nav when any link inside it is clicked.
   */
  const initMobileNav = () => {
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (!navToggle || !mobileNav) return;

    /**
     * Open or close the mobile nav.
     * @param {boolean} [forceClose] - If true, always close regardless of state.
     */
    const toggleNav = (forceClose) => {
      const willOpen = forceClose ? false : !mobileNav.classList.contains('open');

      mobileNav.classList.toggle('open', willOpen);
      navToggle.classList.toggle('open', willOpen);

      if (willOpen) {
        mobileNav.removeAttribute('hidden');
      } else {
        mobileNav.setAttribute('hidden', '');
      }

      navToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    };

    navToggle.addEventListener('click', () => toggleNav());

    // Close when any link inside the mobile nav is clicked.
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleNav(true));
    });
  };

  /* ============================================================
   *  2. Add-to-cart counter with toast
   * ============================================================ */

  /**
   * Attach click listeners to every `.btn-add-cart` button. On click the cart
   * count badge (#cart-count) is incremented, given a brief "pop" animation,
   * and a confirmation toast is shown.
   */
  const initAddToCart = () => {
    const cartCount = document.getElementById('cart-count');
    const addButtons = document.querySelectorAll('.btn-add-cart');

    if (!cartCount || addButtons.length === 0) return;

    addButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name || 'Item';

        // Parse current count (default 0 if text is not a number).
        const current = parseInt(cartCount.textContent, 10) || 0;
        const next = current + 1;
        cartCount.textContent = String(next);

        // Brief "pop" animation via Web Animations API.
        cartCount.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.4)' },
            { transform: 'scale(1)' },
          ],
          { duration: 300, easing: 'ease-out' }
        );

        showToast(`\u2713 ${name} added to cart!`);
      });
    });
  };

  /* ============================================================
   *  3. Newsletter form validation
   * ============================================================ */

  /**
   * Wire up the newsletter form (#newsletter-form). On submit the email field
   * (#newsletter-email) is validated; invalid input shows an error toast and
   * adds an error class, valid input shows a success toast and clears the field.
   */
  const initNewsletter = () => {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');

    if (!form || !emailInput) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email || !EMAIL_REGEX.test(email)) {
        emailInput.classList.add('error');
        showToast('\u26A0\uFE0F Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Valid — show success, clear field, remove error styling.
      emailInput.classList.remove('error');
      emailInput.value = '';
      showToast('\uD83C\uDF89 Thanks for subscribing!');
    });

    // Remove error styling as soon as the user starts correcting the input.
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('error') && EMAIL_REGEX.test(emailInput.value.trim())) {
        emailInput.classList.remove('error');
      }
    });
  };

  /* ============================================================
   *  4. Smooth scroll for in-page anchor links
   * ============================================================ */

  /**
   * Smoothly scroll to the element targeted by an in-page anchor (`href="#…"`),
   * accounting for the sticky header height. Closes the mobile nav if open.
   * @param {string} hash - The hash portion of the href (e.g. "#products").
   */
  const smoothScrollTo = (hash) => {
    if (!hash || hash === '#' || hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!target) return;

    const headerHeight = getHeaderHeight();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  /**
   * Attach progressive-enhancement smooth-scroll listeners to every in-page
   * anchor link (header nav, mobile nav, footer quick links, hero CTAs).
   */
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') return;

        e.preventDefault();
        smoothScrollTo(hash);

        // Close mobile nav if it happens to be open.
        const mobileNav = document.getElementById('mobile-nav');
        const navToggle = document.getElementById('nav-toggle');
        if (mobileNav && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          mobileNav.setAttribute('hidden', '');
          if (navToggle) {
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  };

  /* ============================================================
   *  5. Back-to-top button
   * ============================================================ */

  /**
   * Show/hide the back-to-top button (#back-to-top) based on scroll position,
   * and scroll to the top smoothly when it is clicked.
   */
  const initBackToTop = () => {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    // Toggle visibility on scroll.
    window.addEventListener('scroll', () => {
      if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    // Smooth scroll to top on click.
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  /* ============================================================
   *  Initialisation
   * ============================================================ */

  /**
   * Initialise all interactive features. Because this script is loaded with
   * `defer`, the DOM is already parsed — but we wrap in DOMContentLoaded as a
   * safety net for any non-defer edge cases.
   */
  const init = () => {
    initMobileNav();
    initAddToCart();
    initNewsletter();
    initSmoothScroll();
    initBackToTop();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

