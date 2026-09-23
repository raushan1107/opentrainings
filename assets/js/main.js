/* ===================================================================
   OPEN TRAININGS : shared behaviour
   Nav toggle, scroll reveal, marquee duplication, counters,
   generic accordion/tab wiring. Runs on every page.
   =================================================================== */

(function () {
  "use strict";

  /* ---------- sticky contact bar markup (same on every page) ----------
     Centralised here, instead of duplicated in all ten HTML files, so
     the responsive fix only has to exist in one place. Pages just need
     an empty <div class="contact-bar" data-contact-bar></div>. */
  var CB_ICONS = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5c0-.6.4-1 1-1h3l2 5-2 1.5c1 2.3 2.7 4 5 5l1.5-2 5 2v3c0 .6-.4 1-1 1C10.5 19.5 4.5 13.5 4 5Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a8 8 0 0 0-6.9 12l-1 4 4.1-1A8 8 0 1 0 12 3Z"/><path d="M8.5 10.5c.3 2 2 3.7 4 4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v10H9l-4 4V5Z"/></svg>'
  };
  var CB_LINKS = [
    { href: "tel:+918679450045", icon: "phone", full: "+91 86 7945 0045", short: "Call", cls: "is-primary", attrs: "" },
    { href: "https://wa.me/918679450045", icon: "whatsapp", full: "WhatsApp", short: "WhatsApp", cls: "", attrs: ' target="_blank" rel="noopener"' },
    { href: "mailto:info@opentrainings.org", icon: "mail", full: "info@opentrainings.org", short: "Email", cls: "", attrs: "" },
    { href: "contact.html", icon: "chat", full: "Message Us", short: "Message", cls: "", attrs: "" }
  ];
  document.querySelectorAll("[data-contact-bar]").forEach(function (mount) {
    mount.innerHTML = CB_LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="' + l.cls + '"' + l.attrs + '>' + CB_ICONS[l.icon] +
        '<span class="cb-full">' + l.full + '</span><span class="cb-short">' + l.short + '</span></a>';
    }).join("");
  });

  /* ---------- WhatsApp: floating button (bottom-right) + mobile header
     icon (placed left of the menu toggle). Injected here rather than
     duplicated in every HTML file's header markup. ---------- */
  var WHATSAPP_URL = "https://wa.me/918679450045";

  var fabHolder = document.createElement("div");
  fabHolder.innerHTML = '<a class="whatsapp-fab" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + CB_ICONS.whatsapp + '</a>';
  document.body.appendChild(fabHolder.firstElementChild);

  document.querySelectorAll("[data-nav-toggle]").forEach(function (toggle) {
    var holder = document.createElement("div");
    holder.innerHTML = '<a class="nav-whatsapp" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + CB_ICONS.whatsapp + '</a>';
    var waLink = holder.firstElementChild;

    var group = document.createElement("div");
    group.className = "nav-mobile-actions";
    toggle.parentNode.insertBefore(group, toggle);
    group.appendChild(waLink);
    group.appendChild(toggle);
  });

  /* Every page loads this script last, after its own inline script has
     already registered a DOMContentLoaded listener that renders that
     page's dynamic content (programme rows, case studies, stats...).
     Listeners for the same event fire in registration order, so
     wrapping this whole file in DOMContentLoaded too -- registered
     after that inline listener -- guarantees the DOM is fully built
     out before we go looking for ".reveal" targets, marquees or
     counters to wire up. Without this, anything rendered by JS on a
     page (which is most of the site) would never be found. */
  document.addEventListener("DOMContentLoaded", init);

  function init() {

  /* ---------- mobile nav ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-mobile-panel]");
  const closeBtn = document.querySelector("[data-nav-close]");

  function openPanel() {
    if (!panel) return;
    panel.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (toggle) toggle.addEventListener("click", openPanel);
  if (closeBtn) closeBtn.addEventListener("click", closePanel);
  if (panel) {
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", closePanel));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- nav dropdown (click-to-toggle, for touch as well as hover) ---------- */
  document.querySelectorAll(".nav-item > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".nav-item");
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".nav-item.is-open").forEach((el) => el.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".nav-item.is-open").forEach((el) => el.classList.remove("is-open"));
    }
  });

  /* ---------- hero carousel ---------- */
  document.querySelectorAll("[data-hero]").forEach((hero) => {
    const slides = Array.from(hero.querySelectorAll(".hero-slide"));
    const dots = Array.from(hero.querySelectorAll(".hero-dots button"));
    if (slides.length < 2) return;
    let active = 0;
    let timer;

    function show(i) {
      slides[active].classList.remove("is-active");
      dots[active] && dots[active].classList.remove("is-active");
      active = i;
      slides[active].classList.add("is-active");
      dots[active] && dots[active].classList.add("is-active");
    }
    function next() { show((active + 1) % slides.length); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { show(i); restart(); });
    });
    restart();
  });

  /* ---------- scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- animated counters ---------- */
  function animateCounter(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits.replace(/,/g, ""), 10);
    if (isNaN(target)) return;
    const duration = 1100;
    const start = performance.now();
    el.textContent = prefix + "0" + suffix;
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = prefix + value.toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterTargets = document.querySelectorAll("[data-counter]");
  if ("IntersectionObserver" in window && counterTargets.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counterTargets.forEach((el) => cio.observe(el));
  }

  /* ---------- generic accordion (delegated so dynamic content works) ---------- */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".accordion-trigger");
    if (!trigger) return;
    const item = trigger.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");
    const isOpen = item.classList.contains("is-open");

    if (item.closest("[data-accordion-solo]")) {
      item.parentElement.querySelectorAll(".accordion-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });
    }

    if (isOpen) {
      item.classList.remove("is-open");
      panel.style.maxHeight = null;
    } else {
      item.classList.add("is-open");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  /* ---------- generic tabs (delegated) ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    const group = btn.closest("[data-tabs]");
    if (!group) return;
    const targetId = btn.getAttribute("data-tab");

    group.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", "false"));
    btn.setAttribute("aria-selected", "true");

    group.querySelectorAll("[data-tab-panel]").forEach((p) => {
      p.classList.toggle("is-active", p.getAttribute("data-tab-panel") === targetId);
    });
  });

  } // end init

})();
