/* ============================================
   MAIN.JS — BGR Couverture & Construction
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* === NAVBAR SCROLL === */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* === MENU BURGER (mobile) === */
  const burger = document.querySelector('.navbar__burger');
  const navLinks = document.querySelector('.navbar__links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      const spans = burger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* === SCROLL REVEAL === */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* === SMOOTH SCROLL === */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* === FLOATING CALL BUTTON (mobile) === */
  const callFab = document.getElementById('callFab');
  const hero = document.querySelector('.hero');

  if (callFab && hero) {
    const fabObserver = new IntersectionObserver((entries) => {
      callFab.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0 });
    fabObserver.observe(hero);
  }

  /* === ACTIVE NAV LINK === */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.navbar__links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 80) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* === CONTACT FORM FEEDBACK === */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;
    });
  }

});
