/* No.8 Noodle Bar 绽放.中餐馆 — site behaviour */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- opening animation ------------------------------------------------ */
  var intro = document.getElementById('intro');
  function dropIntro() {
    if (!intro) return;
    intro.classList.add('gone');
    window.setTimeout(function () {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }, 900);
  }
  if (intro) {
    if (reduced) { dropIntro(); }
    else { window.setTimeout(dropIntro, 1250); }
  }

  /* ---- rotating hero ---------------------------------------------------- */
  var slides = document.querySelectorAll('.hero__slide');
  if (slides.length > 1 && !reduced) {
    var i = 0;
    window.setInterval(function () {
      slides[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('on');
    }, 5600);
  }

  /* ---- nav background on scroll ---------------------------------------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile drawer --------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  var scrim = document.querySelector('.scrim');
  function shut() {
    if (burger) burger.classList.remove('on');
    if (drawer) drawer.classList.remove('open');
    if (scrim) scrim.classList.remove('on');
    document.body.style.overflow = '';
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.classList.toggle('on', open);
      if (scrim) scrim.classList.toggle('on', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  if (scrim) scrim.addEventListener('click', shut);
  Array.prototype.forEach.call(document.querySelectorAll('.drawer a'), function (a) {
    a.addEventListener('click', shut);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });

  /* ---- Gmail compose links (address assembled in JS, never in the HTML) - */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-gmail]'), function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-emailtext]'), function (el) {
    el.textContent = el.getAttribute('data-user') + '@' + el.getAttribute('data-domain');
  });

  /* ---- scroll reveal --------------------------------------------------- */
  var targets = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (t, n) {
      t.style.transitionDelay = (Math.min(n % 4, 3) * 90) + 'ms';
      io.observe(t);
    });
  }

  /* ---- current year ---------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
