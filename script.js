const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const observerTargets = document.querySelectorAll(".fade-up");
const pageSections = document.querySelectorAll("main section[id]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("is-open");
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  observerTargets.forEach((element) => observer.observe(element));
} else {
  observerTargets.forEach((element) => element.classList.add("is-visible"));
}

if ("IntersectionObserver" in window && pageSections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sectionId = entry.target.getAttribute("id");
        navAnchors.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${sectionId}`;
          link.classList.toggle("is-active", isMatch);
        });
      });
    },
    { threshold: 0.45 }
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const whatsappWidget = document.getElementById("whatsapp-widget");
if (whatsappWidget) {
  // Replace this data attribute later with your API-generated WhatsApp link.
  const apiLink = whatsappWidget.dataset.waLink?.trim();
  if (apiLink) {
    whatsappWidget.setAttribute("href", apiLink);
  }
}

const contactForm = document.getElementById("contact-form");
const contactNote = document.getElementById("contact-note");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!(contactForm instanceof HTMLFormElement)) return;
    if (!contactForm.checkValidity()) {
      contactNote.textContent = "Please fill all fields correctly.";
      return;
    }

    const name = contactForm.elements.namedItem("name")?.value?.trim() || "";
    const phone = contactForm.elements.namedItem("phone")?.value?.trim() || "";
    const message = contactForm.elements.namedItem("message")?.value?.trim() || "";
    const text = `Hi Dakshini!%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;

    contactNote.textContent = "Thanks! Redirecting you to WhatsApp...";
    const waBase = (whatsappWidget?.getAttribute("href") || "https://wa.me/919999999999").split("?")[0];
    window.open(`${waBase}?text=${text}`, "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}
