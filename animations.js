(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.documentElement.classList.add('motion-ready');

  const items = [...document.querySelectorAll('.project-card, .focus-card, .link-card')];
  const counts = new Map();

  items.forEach((item) => {
    item.classList.add('motion-reveal');
    const parent = item.parentElement;
    const index = counts.get(parent) || 0;
    item.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 65}ms`);
    counts.set(parent, index + 1);
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('.project-card, .focus-card, .link-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
})();
