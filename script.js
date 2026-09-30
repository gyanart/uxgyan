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

  // ---------- Lightbox ----------
  // Any <img> inside an element carrying [data-lightbox-group] opens a
  // fullscreen slideshow scoped to that group. Caption is read from the
  // image's data-caption attribute, falling back to its alt text.
  var groups = document.querySelectorAll('[data-lightbox-group]');
  if (groups.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<div class="lightbox-bar">' +
        '<span class="lightbox-count"></span>' +
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="lightbox-stage">' +
        '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&larr;</button>' +
        '<img src="" alt="">' +
        '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&rarr;</button>' +
      '</div>' +
      '<div class="lightbox-caption"></div>';
    document.body.appendChild(lb);

    var stageImg = lb.querySelector('.lightbox-stage img');
    var captionEl = lb.querySelector('.lightbox-caption');
    var countEl = lb.querySelector('.lightbox-count');
    var prevBtn = lb.querySelector('.lightbox-prev');
    var nextBtn = lb.querySelector('.lightbox-next');
    var closeBtn2 = lb.querySelector('.lightbox-close');

    var currentSet = [];
    var currentIndex = 0;
    var lastFocused = null;

    function caption(img) {
      return img.getAttribute('data-caption') || img.getAttribute('alt') || '';
    }

    function render() {
      var img = currentSet[currentIndex];
      stageImg.src = img.getAttribute('src');
      stageImg.alt = img.getAttribute('alt') || '';
      captionEl.textContent = caption(img);
      countEl.textContent = (currentIndex + 1) + ' / ' + currentSet.length;
      var multi = currentSet.length > 1;
      prevBtn.style.display = multi ? '' : 'none';
      nextBtn.style.display = multi ? '' : 'none';
    }

    function open(set, index) {
      currentSet = set;
      currentIndex = index;
      lastFocused = document.activeElement;
      render();
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn2.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      stageImg.src = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    function step(delta) {
      if (currentSet.length < 2) return;
      currentIndex = (currentIndex + delta + currentSet.length) % currentSet.length;
      render();
    }

    groups.forEach(function (group) {
      var imgs = Array.prototype.slice.call(group.querySelectorAll('img'));
      imgs.forEach(function (img, i) {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        var label = caption(img);
        img.setAttribute('aria-label', 'Open larger view' + (label ? ': ' + label : ''));
        var activate = function () { open(imgs, i); };
        img.addEventListener('click', activate);
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          }
        });
      });
    });

    closeBtn2.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox-stage')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
});

/* ---------- Contact form ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: if a bot filled the hidden field, silently pretend success.
    var honeypot = form.querySelector('.form-hp');
    if (honeypot && honeypot.value) {
      form.reset();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          status.textContent = "Thanks — that's sent. I'll get back to you soon.";
          status.classList.add('is-success');
        } else {
          return response.json().then(function (data) {
            var msg = (data && data.errors && data.errors.map(function (er) { return er.message; }).join(', ')) ||
              "Something went wrong — please email me directly at gyanart@gmail.com.";
            status.textContent = msg;
            status.classList.add('is-error');
          });
        }
      })
      .catch(function () {
        status.textContent = "Couldn't send that — please email me directly at gyanart@gmail.com.";
        status.classList.add('is-error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message →';
      });
  });
});
