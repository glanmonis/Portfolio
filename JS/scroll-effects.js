// Scroll reveal effect
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Skills Section - Enhanced with typing animation
document.addEventListener("DOMContentLoaded", () => {
  const skillSection = document.querySelector("#skills");
  if (!skillSection) return;

  // Reveal animation on scroll with optimized timing
  const revealItems = skillSection.querySelectorAll(
    ".section-title, .section-subtitle, .skill-category"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger reveal animation with improved timing
          revealItems.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("revealed");
            }, index * 170); // ms for smoother flow
          });
          
          // Stop observing after reveal
          revealObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.1, // Trigger slightly earlier
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealObserver.observe(skillSection);

  // Category toggle functionality with enhanced animation
  const categories = document.querySelectorAll(".skill-category");

  categories.forEach((category) => {
    const header = category.querySelector(".category-header");
    
    // Add ARIA attributes for accessibility
    header.setAttribute("role", "button");
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("tabindex", "0");
    
    const categoryContent = category.querySelector(".category-content");
    const categoryId = `category-${Math.random().toString(36).substr(2, 9)}`;
    categoryContent.setAttribute("id", categoryId);
    header.setAttribute("aria-controls", categoryId);

    // Click handler with improved animation
    const toggleCategory = () => {
      const isActive = category.classList.contains("active");

      // Close all categories first
      categories.forEach((cat) => {
        if(cat.classList.contains("active")) {
          cat.classList.add("closing");
          setTimeout(() => {
            cat.classList.remove("active", "closing");
          }, 300);
        }
        const catHeader = cat.querySelector(".category-header");
        catHeader.setAttribute("aria-expanded", "false");
        
        // Reset all skill items in closing categories
        const skillItems = cat.querySelectorAll(".skill-item");
        skillItems.forEach(item => {
          item.style.animation = "none";
        });
      });

      // Open clicked category if it was closed
      if (!isActive) {
        // Small delay to ensure close animation completes
        setTimeout(() => {
          category.classList.add("active");
          header.setAttribute("aria-expanded", "true");
          
          // Trigger skill items animation
          const skillItems = category.querySelectorAll(".skill-item");
          skillItems.forEach((item, index) => {
            // Force reflow to restart animation
            item.style.animation = "none";
            void item.offsetWidth; // Trigger reflow
            item.style.animation = "";
          });
        }, 100);
      }
    };

    header.addEventListener("click", toggleCategory);

    // Keyboard navigation
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCategory();
      }
    });

    // Arrow key navigation between categories
    header.addEventListener("keydown", (e) => {
      const currentIndex = Array.from(categories).indexOf(category);
      let nextIndex;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % categories.length;
        categories[nextIndex].querySelector(".category-header").focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + categories.length) % categories.length;
        categories[nextIndex].querySelector(".category-header").focus();
      }
    });
  });

  // Optional: Auto-open first category with typing animation
  // Uncomment these lines if you want the first category open by default
  /*
  setTimeout(() => {
    const firstCategory = categories[0];
    if (firstCategory) {
      firstCategory.classList.add("active");
      firstCategory.querySelector(".category-header").setAttribute("aria-expanded", "true");
    }
  }, 800); // Delay to let page load animation complete
  */

  // Add smooth scroll behavior for better UX
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});