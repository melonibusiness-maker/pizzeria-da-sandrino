document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

let lastScroll = window.scrollY;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 120) {
    nav.style.transform = 'translateY(-110%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });
