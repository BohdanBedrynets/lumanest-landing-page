const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".nav a");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const emailInput = document.getElementById("email");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".reveal");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

if (contactForm && formMessage && emailInput) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    formMessage.classList.remove("is-success", "is-error");

    if (!emailValue) {
      formMessage.textContent = "Please enter your email address.";
      formMessage.classList.add("is-error");
      return;
    }

    if (!isValidEmail) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.classList.add("is-error");
      return;
    }

    formMessage.textContent = "Thanks for subscribing. We’ll keep you updated.";
    formMessage.classList.add("is-success");
    contactForm.reset();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}