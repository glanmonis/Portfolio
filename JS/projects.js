//Select only elements WITHOUT reveal class already
const revealElements = document.querySelectorAll(".project-card:not(.reveal), .section-title");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el, index) => {
  el.classList.add("reveal");

  if (el.classList.contains("project-card")) {
    const delayClass = `delay-${(index % 6) + 1}`; // Cycle through delay-1 to delay-6
    el.classList.add(delayClass);
  }

  observer.observe(el);
});