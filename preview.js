/**
 * Luxellia Parfums — Unified Storefront Interactions
 * Version: 1.3.1
 * Purpose: Safe client-side UI interactions, mobile navigation, and mock preview cart.
 * Strict Constraint: Uses isolated localStorage key 'luxellia_preview_cart_v1'. Zero customer data.
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__LUXELLIA_PREVIEW_INIT__) return;
  window.__LUXELLIA_PREVIEW_INIT__ = true;

  const CART_STORAGE_KEY = 'luxellia_preview_cart_v1';

  // 1. Safe Mock Cart Management
  function getCartCount() {
    try {
      const val = localStorage.getItem(CART_STORAGE_KEY);
      if (!val) return 0;
      const count = parseInt(val, 10);
      return isNaN(count) ? 0 : Math.max(0, count);
    } catch {
      return 0;
    }
  }

  function setCartCount(newCount) {
    const safeCount = Math.max(0, parseInt(newCount, 10) || 0);
    try {
      localStorage.setItem(CART_STORAGE_KEY, String(safeCount));
    } catch {}
    return safeCount;
  }

  let toastTimeout = null;
  function showToast(message) {
    const toast = document.getElementById('luxelliaToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      toastTimeout = null;
    }, 2800);
  }

  function updateCartBadge() {
    const count = getCartCount();
    const badge = document.getElementById('cartCount');
    const cartBtn = document.getElementById('cartBtn');
    if (badge) {
      badge.textContent = String(count);
    }
    if (cartBtn) {
      cartBtn.setAttribute('aria-label', `سلة المشتريات التجريبية: ${count} منتجات`);
    }
  }

  function addToCart(productName, productId) {
    const current = getCartCount();
    const next = setCartCount(current + 1);
    updateCartBadge();
    const name = productName || 'المنتج التجريبي';
    showToast(`تمت إضافة ${name} إلى السلة التجريبية`);
  }

  // Expose safe API for products.js
  window.__LUXELLIA_CART__ = {
    getCount: getCartCount,
    setCount: setCartCount,
    add: addToCart,
    updateBadge: updateCartBadge,
    showToast: showToast,
    STORAGE_KEY: CART_STORAGE_KEY
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart Badge
    updateCartBadge();

    // Synchronize cart across browser tabs and pages
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateCartBadge();
      }
    });

    // 2. Mobile Menu Toggle
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

    // 3. Header shadow on scroll
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

    // 4. Cart Button Click (Show informative toast status)
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const count = getCartCount();
        if (count === 0) {
          showToast('السلة التجريبية فارغة حالياً — تصفح المنتجات وأضف عطورك المفضلة');
        } else {
          showToast(`السلة التجريبية تحتوي على ${count} منتج — بيئة معاينة تجريبية`);
        }
      });
    }

    // 5. Header Search Button Action
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        const searchInput = document.getElementById('catalogSearchInput');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // On index.html: navigate to products.html
          window.location.href = 'products.html';
        }
      });
    }

    // 6. Global Add to Cart via Event Delegation
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.luxellia-btn-add');
      if (!btn) return;
      e.preventDefault();
      const productName = btn.getAttribute('data-name') || 'عطر فاخر';
      const productId = btn.getAttribute('data-id') || 'mock-item';
      addToCart(productName, productId);
    });

    // 7. Brands strip mobile touch pause / resume
    const brandsStrip = document.querySelector('.luxellia-brands-strip');
    if (brandsStrip) {
      let touchResumeTimer = null;
      brandsStrip.addEventListener('touchstart', () => {
        if (touchResumeTimer) clearTimeout(touchResumeTimer);
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
