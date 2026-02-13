/* ==========================================================
   QUALIFICATIONS SECTION - FULL JAVASCRIPT
   Author: Your Portfolio
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     CERTIFICATE / EDUCATION FLIP CARDS
     ========================================================== */

  const cards = document.querySelectorAll(".cert-card");

  cards.forEach((card, index) => {
    // Accessibility
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Qualification card ${index + 1}. Press Enter or Space to view details.`
    );
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("tabindex", "0");

    // Click → flip
    card.addEventListener("click", () => {
      const isActive = card.classList.toggle("active");
      card.setAttribute("aria-pressed", isActive.toString());
    });

    // Keyboard → flip
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const isActive = card.classList.toggle("active");
        card.setAttribute("aria-pressed", isActive.toString());
      }

      // Escape → close
      if (e.key === "Escape") {
        card.classList.remove("active");
        card.setAttribute("aria-pressed", "false");
      }
    });
  });

  /* ==========================================================
     TAB SWITCHING (CERTIFICATES / EDUCATION)
     ========================================================== */

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels  = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn, btnIndex) => {
    // Accessibility
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", btnIndex === 0 ? "true" : "false");
    btn.setAttribute("tabindex", btnIndex === 0 ? "0" : "-1");

    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tabLink; // ✅ FIXED

      // Update buttons
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
        b.setAttribute("tabindex", "-1");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      btn.setAttribute("tabindex", "0");

      // Switch panels
      tabPanels.forEach(panel => {
        const isActive = panel.id === targetId;

        panel.classList.toggle("active", isActive);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-hidden", (!isActive).toString());

        // Re-trigger animations when panel becomes active
        if (isActive) {
          const cards = panel.querySelectorAll(".cert-card");

          cards.forEach((card, index) => {
            card.style.animation = "none";
            void card.offsetHeight; // force reflow
            card.style.animation =
              `cardFadeIn 0.6s ease forwards ${0.15 * (index + 1)}s`;
          });
        }
      });
    });

    /* ==========================================================
       KEYBOARD NAVIGATION FOR TABS
       ========================================================== */

    btn.addEventListener("keydown", (e) => {
      let newIndex;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        newIndex = (btnIndex + 1) % tabButtons.length;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        newIndex = (btnIndex - 1 + tabButtons.length) % tabButtons.length;
      }

      if (newIndex !== undefined) {
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      }
    });
  });

  /* ==========================================================
     INITIAL PANEL STATES
     ========================================================== */

  tabPanels.forEach((panel, index) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-hidden", index === 0 ? "false" : "true");
  });

});
