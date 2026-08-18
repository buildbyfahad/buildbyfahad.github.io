// year
document.getElementById('year').textContent = new Date().getFullYear();

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// count-up stats
const counted = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, suffix = el.textContent.replace(/[\d]/g, '');
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 900, 1);
      el.textContent = Math.floor(p * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counted.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats dd[data-count]').forEach(el => counted.observe(el));
