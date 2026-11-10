/* Header state on scroll */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Mobile menu */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

function setMenu(open) {
  burger.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}
burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* Reveal on scroll (staggered per section) */
const io = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    io.unobserve(entry.target);
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll("section, footer").forEach((section) => {
  section.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
    io.observe(el);
  });
});

/* Count-up numbers */
const counter = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const pad = Number(el.dataset.pad || 0);
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const value = Math.round((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = String(value).padStart(pad, "0");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counter.unobserve(el);
  }),
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

/* Pre-fill the quote form from product / factory links */
const form = document.getElementById("quoteForm");
const locationField = document.getElementById("locationField");

document.querySelectorAll("[data-gas]").forEach((link) =>
  link.addEventListener("click", () => {
    const radio = form.querySelector(`input[name="gas"][value="${link.dataset.gas}"]`);
    if (radio) radio.checked = true;
  })
);
document.querySelectorAll("[data-location]").forEach((link) =>
  link.addEventListener("click", () => { locationField.value = link.dataset.location; })
);

/* Quote form submit (Formspree) */
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const ok = input.value.trim() && input.checkValidity();
    input.closest(".field").classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = "Please fill in the required fields.";
    status.style.color = "#c2412f";
    return;
  }

  const button = form.querySelector("button[type=submit]");
  const label = button.innerHTML;
  button.disabled = true;
  button.textContent = "Sending…";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Request failed");
    form.reset();
    status.textContent = "Thank you. Our team will get back to you shortly.";
    status.style.color = "#1f7a4d";
  } catch {
    status.textContent = "Something went wrong. Please email or call us directly.";
    status.style.color = "#c2412f";
  } finally {
    button.disabled = false;
    button.innerHTML = label;
  }
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
