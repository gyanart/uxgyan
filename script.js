// Gyaneshwar Mule — portfolio: small progressive-enhancement JS
// Scroll reveals, sticky-nav border state, mobile sheet menu.

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav border on scroll
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveals
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Mobile sheet menu
  var toggle = document.querySelector('.nav-toggle');
  var sheet = document.querySelector('.mobile-sheet');
  var closeBtn = document.querySelector('.close-btn');
  if (toggle && sheet) {
    toggle.addEventListener('click', function () { sheet.classList.add('open'); });
  }
  if (closeBtn && sheet) {
    closeBtn.addEventListener('click', function () { sheet.classList.remove('open'); });
  }
  if (sheet) {
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { sheet.classList.remove('open'); });
    });
  }
});
