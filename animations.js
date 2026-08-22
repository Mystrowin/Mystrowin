(() => {
  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-YJBJCQDLHE';
  document.head.appendChild(googleTag);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', 'G-YJBJCQDLHE');
})();

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.documentElement.classList.add('motion-ready');

  const selectors = [
    '.section-heading',
    '.destination',
    '.project-main',
    '.project-side',
    '.pillar',
    '.detail',
    '.story-card',
    '.identity-card',
    '.timeline-item',
    '.link-card'
  ];

  const items = [...document.querySelectorAll(selectors.join(','))];

  const parentCounts = new Map();
  items.forEach((element) => {
    element.classList.add('motion-reveal');
    const parent = element.parentElement;
    const index = parentCounts.get(parent) || 0;
    element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
    parentCounts.set(parent, index + 1);
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -7% 0px'
  });

  items.forEach((item) => observer.observe(item));

  const glowCards = document.querySelectorAll(
    '.destination, .project-main, .project-side, .link-card'
  );

  glowCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
})();
