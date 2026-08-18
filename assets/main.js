/* ============================================================
   Fahad Memon — portfolio behaviour
   ============================================================ */
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- footer year ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- theme toggle (initial value is set inline in <head>) ---- */
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const label = () => btn.setAttribute('aria-label',
    `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
  label();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
})();

/* ---- mobile menu ---- */
(() => {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  if (!nav || !burger) return;
  const close = () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ---- sticky nav state + scroll progress ---- */
(() => {
  const nav = document.getElementById('nav');
  const bar = document.getElementById('nav-progress');
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle('stuck', y > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* ---- active section in the nav ---- */
(() => {
  const links = [...document.querySelectorAll('.nav-links a')];
  const map = new Map();
  links.forEach(a => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) map.set(el, a);
  });
  if (!map.size || !('IntersectionObserver' in window)) return;
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove('active'));
      map.get(e.target).classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, el) => spy.observe(el));
})();

/* ---- scroll reveal — with a hard fallback so content can never stay hidden ---- */
(() => {
  const items = [...document.querySelectorAll('.reveal')];
  const revealAll = () => items.forEach(el => el.classList.add('in'));
  if (!('IntersectionObserver' in window)) return revealAll();
  setTimeout(revealAll, 3000);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

/* ---- count-up stats ---- */
(() => {
  const nums = [...document.querySelectorAll('.stats dd[data-count]')];
  if (!nums.length) return;
  if (reduced || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.textContent.replace(/\d/g, '');
      let start = null;
      const step = t => {
        if (!start) start = t;
        const p = Math.min((t - start) / 900, 1);
        el.textContent = Math.floor(p * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => io.observe(el));
})();

/* ---- project category filter ---- */
(() => {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  const buttons = [...document.querySelectorAll('.filter')];
  const cards = [...grid.querySelectorAll('[data-cat]')];

  const apply = want => cards.forEach(c => {
    c.hidden = !(want === 'all' || c.dataset.cat.split(' ').includes(want));
    // the featured card only spans full width while everything is shown
    c.classList.toggle('span-off', want !== 'all');
  });

  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });
    apply(btn.dataset.filter);
  }));
})();

/* ---- hero role rotator ---- */
(() => {
  const track = document.querySelector('.roles-track');
  if (!track || reduced) return;
  const items = [...track.children];
  if (items.length < 2) return;
  track.appendChild(items[0].cloneNode(true));   // clone for a seamless wrap
  let i = 0;
  setInterval(() => {
    i++;
    track.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateY(-${i * items[0].offsetHeight}px)`;
    if (i === items.length) {
      setTimeout(() => { track.style.transition = 'none'; track.style.transform = 'translateY(0)'; i = 0; }, 570);
    }
  }, 2200);
})();

/* ---- pointer-tracked card spotlight ---- */
(() => {
  if (reduced || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
})();

/* ---- copy email ---- */
(() => {
  const btn = document.getElementById('copy-mail');
  if (!btn || !navigator.clipboard) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.mail);
      btn.dataset.copied = 'true';
      setTimeout(() => delete btn.dataset.copied, 1600);
    } catch (e) { /* clipboard blocked — the mailto link still works */ }
  });
})();

/* ---- hero intro safety net: never leave the copy at opacity 0 ---- */
setTimeout(() => document.body.classList.add('hero-ready'), 2200);
