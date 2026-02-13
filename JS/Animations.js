// Animation.js

// Background animation dots
function createDots() {
  const bg = document.getElementById('bgAnimation');

  for (let i = 0; i < 100; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';

    dot.style.animationDelay = Math.random() * 6 + 's';
    dot.style.animationDuration = (Math.random() * 3 + 4) + 's';

    bg.appendChild(dot);
  }
}

// Initialize
createDots();


// Scroll-triggered animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

 // Observe elements for animation
document.querySelectorAll(
  '.skill-item,.project-card,.contact-item,.about' ).forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.6s';
  observer.observe(el);
});

// Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });