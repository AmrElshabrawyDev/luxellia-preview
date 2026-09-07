/**
 * Luxellia Parfums - Preview Interactions
 * Safe local interaction script for mock preview
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__LUXELLIA_PREVIEW_INIT__) return;
  window.__LUXELLIA_PREVIEW_INIT__ = true;

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 2. Header shadow on scroll
    const header = document.getElementById('main-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // 3. Mock Add to Cart action
    let cartItemCount = 0;
    const cartCountBadge = document.getElementById('cartCount');
    const cartBtn = document.getElementById('cartBtn');
    const toast = document.getElementById('luxelliaToast');
    let toastTimeout;

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    document.querySelectorAll('.luxellia-btn-add').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const productName = btn.getAttribute('data-name') || 'المنتج التجريبي';
        cartItemCount += 1;
        if (cartCountBadge) {
          cartCountBadge.textContent = String(cartItemCount);
        }
        if (cartBtn) {
          cartBtn.setAttribute('aria-label', `سلة المشتريات: ${cartItemCount} منتجات`);
        }
        showToast(`تمت إضافة ${productName} إلى السلة التجريبية`);
      });
    });

    // 4. Brands strip mobile touch pause / resume
    const brandsStrip = document.querySelector('.luxellia-brands-strip');
    if (brandsStrip) {
      let touchResumeTimer = null;
      brandsStrip.addEventListener('touchstart', () => {
        clearTimeout(touchResumeTimer);
        brandsStrip.classList.add('is-paused');
      }, { passive: true });

      brandsStrip.addEventListener('touchend', () => {
        touchResumeTimer = setTimeout(() => {
          brandsStrip.classList.remove('is-paused');
        }, 1200);
      }, { passive: true });
    }
  });
})();
