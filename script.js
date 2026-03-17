const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setYear() {
  const el = $("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

function mobileMenu() {
  const btn = $("[data-menu-button]");
  const menu = $("[data-menu]");
  if (!btn || !menu) return;

  const close = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.dataset.open = "false";
  };

  const open = () => {
    btn.setAttribute("aria-expanded", "true");
    menu.dataset.open = "true";
  };

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? close() : open();
  });

  $$(".nav__link, .nav__cta", menu).forEach((a) => {
    a.addEventListener("click", () => close());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function parallax() {
  const target = $("[data-parallax]");
  if (!target) return;

  const prefersReduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduce) return;

  const onMove = (e) => {
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    const rotateX = (-dy * 6).toFixed(2);
    const rotateY = (dx * 8).toFixed(2);
    target.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const reset = () => {
    target.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", reset);
}

function contactForm() {
  const form = $("[data-form]");
  const hint = $("[data-form-hint]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    const subject = encodeURIComponent(`Contato pelo portfólio — ${nome}`);
    const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`);

    const to = "luizfelipe2014506@gmail.com";
    const url = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = url;

    if (hint) {
      hint.textContent = "Abrindo seu app de email…";
    }
  });
}

setYear();
mobileMenu();
parallax();
contactForm();

