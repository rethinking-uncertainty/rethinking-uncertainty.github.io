// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close the menu after tapping a link (mobile)
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-spy: highlight the nav link for the section currently in view
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navMap = new Map();
document.querySelectorAll('.nav-links a').forEach((a) => {
  const id = a.getAttribute('href').slice(1);
  navMap.set(id, a);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navMap.forEach((a) => a.classList.remove('active'));
        const active = navMap.get(entry.target.id);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((s) => observer.observe(s));
