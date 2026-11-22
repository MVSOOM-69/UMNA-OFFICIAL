
// UMNA — Website interactions

const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Scroll behaviour
function handleScroll() {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  // Navigation background
  navbar.classList.toggle("scrolled", scrollTop > 50);

  // Reading progress
  const percentage =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progress.style.width = percentage + "%";
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


// Reveal elements when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});


// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});


// Close mobile menu after selecting a section
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// Smooth navigation for internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    }
  });
});


// Subtle parallax effect for the hero glow
const heroGlow = document.querySelector(".hero-glow");

window.addEventListener("scroll", () => {
  if (!heroGlow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const movement = Math.min(window.scrollY * 0.12, 100);
  heroGlow.style.transform = `translateY(${movement}px)`;
}, { passive: true });


// Footer year
const footerYear = document.querySelector(".footer small");

if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} UMNA. All rights reserved.`;
}
