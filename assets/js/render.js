/* ===================================================================
   OPEN TRAININGS : render layer (v2 — card/carousel styling)
   Turns data.js into DOM. Pages call whichever of these they need
   after DOMContentLoaded. Keeping this separate from data.js means
   the same catalogue can be reused (home teaser, full programmes
   list, filtered list) without copy-pasting markup per page.
   =================================================================== */

(function () {
  "use strict";
  const D = window.OT_DATA;

  function q(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function initials(str) {
    return String(str).trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }

  /* small inline icon set — hand-drawn line icons, not an imported icon font */
  const ICONS = {
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15.8 14.3c2.8.4 4.7 2.5 4.7 5.7"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4.5C4 3.7 4.7 3 5.5 3H12v18H5.5c-.8 0-1.5-.7-1.5-1.5v-15Z"/><path d="M20 4.5c0-.8-.7-1.5-1.5-1.5H12v18h6.5c.8 0 1.5-.7 1.5-1.5v-15Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.5 4.2 5.6 4.2 9s-1.4 6.5-4.2 9c-2.8-2.5-4.2-5.6-4.2-9s1.4-6.5 4.2-9Z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7L12 2.5Z"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7"/></svg>',
    screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M8 20.5h8M12 16.5v4"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="11" height="18" rx="1"/><path d="M15 8h5v13h-5M8 7v.01M8 11v.01M8 15v.01"/></svg>',
    badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="5.2"/><path d="M8.5 13.7 6.5 21l5.5-3 5.5 3-2-7.3"/></svg>'
  };
  function icon(name) { return ICONS[name] || ""; }

  /* ---------- hero carousel (home page) ---------- */
  function renderHero(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.heroSlides.map((s, i) => `
      <div class="hero-slide${i === 0 ? " is-active" : ""}" data-slide="${i}">
        <div class="hero-slide-bg" style="background-image:url('${s.image}')"></div>
        <div class="wrap hero-slide-inner">
          <div class="hero-content">
            <p class="hero-eyebrow">${esc(s.eyebrow)}</p>
            <h1 class="display-1">${esc(s.title)}</h1>
            <p class="hero-sub">${esc(s.sub)}</p>
            <p class="hero-stat-line">${esc(s.statLine)}</p>
            <div class="hero-actions" style="margin-top:1.8rem;">
              <a href="training.html" class="btn btn-navy">Browse Training</a>
              <a href="contact.html" class="btn btn-outline">Talk to Us</a>
            </div>
          </div>
        </div>
      </div>
    `).join("") + `<div class="hero-dots">${D.heroSlides.map((s, i) => `<button aria-label="Slide ${i + 1}" class="${i === 0 ? "is-active" : ""}" data-dot="${i}"></button>`).join("")}</div>`;
  }

  /* ---------- accreditation / logo strip (continuous scroll) ----------
     The track's CSS animation scrolls it exactly -50%, so the content is
     rendered twice back to back -- once the first copy has scrolled fully
     out of view, the second copy is in the exact position the first
     started in, and the loop jumps back to 0% invisibly. */
  function renderAccreditation(sel) {
    const el = q(sel);
    if (!el) return;
    const badges = D.accreditation.map((a) => `<span class="logo-badge">${esc(a)}</span>`).join("");
    el.innerHTML = badges + badges;
  }

  /* ---------- stats strip (icon cards) ---------- */
  const STAT_ICONS = ["people", "book", "globe", "star"];
  function renderStats(sel, list) {
    const el = q(sel);
    if (!el) return;
    list = list || D.stats;
    el.innerHTML = list.map((s, i) => `
      <div class="stat-card reveal">
        <div class="stat-icon">${icon(STAT_ICONS[i % STAT_ICONS.length])}</div>
        <div class="num" data-counter>${esc(s.num)}</div>
        <div class="label">${esc(s.label)}</div>
      </div>
    `).join("");
  }

  /* ---------- feature grid ("why choose us") ---------- */
  function renderFeatureGrid(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.featureGrid.map((f, i) => `
      <div class="feature-card reveal">
        <div class="feature-icon">${icon(STAT_ICONS[i % STAT_ICONS.length])}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.desc)}</p>
      </div>
    `).join("");
  }

  /* ---------- labs ---------- */
  function renderLabs(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.labs.map((l) => `
      <div class="mode-card reveal">
        <div class="mode-icon">${icon(l.icon)}</div>
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.desc)}</p>
        <span class="tag" style="margin-top:0.9rem; display:inline-block;">${esc(l.bestFor)}</span>
      </div>
    `).join("");
  }

  /* ---------- vouchers ---------- */
  function renderVouchers(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.vouchers.map((v) => `
      <div class="course-card reveal">
        <div class="course-card-top">
          <span class="course-pill">${esc(v.vendor)}</span><span class="course-pill course-pill--level">${esc(v.level)}</span>
          <h3>${esc(v.exam)}</h3>
          <p>${esc(v.code)} &middot; ${esc(v.format)}</p>
          <div class="course-meta"><span>${esc(v.validity)}</span></div>
        </div>
        <div class="course-card-bottom">
          <span class="course-cohort">Delivered as<br><b>Voucher code</b></span>
          <a class="btn btn-outline btn-sm" href="contact.html?voucher=${encodeURIComponent(v.exam)}">Request this voucher</a>
        </div>
      </div>
    `).join("");
  }

  /* ---------- testimonials ---------- */
  function renderTestimonials(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.testimonials.map((t) => `
      <div class="testimonial-card reveal">
        <p class="testimonial-quote">${esc(t.quote)}</p>
        <div class="testimonial-attr">
          <div class="roster-avatar">${esc(t.initials)}</div>
          <div>
            <div style="font-weight:700; font-size:0.9rem; color:var(--navy-deep);">${esc(t.role)}</div>
            <div style="font-size:0.82rem; color:var(--ink-soft);">${esc(t.sector)}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ---------- services roster ---------- */
  function renderServices(sel, opts) {
    const el = q(sel);
    if (!el) return;
    const limit = (opts && opts.limit) || D.services.length;
    el.innerHTML = D.services.slice(0, limit).map((s, i) => `
      <div class="roster-row reveal">
        <div class="roster-avatar">${pad(i + 1)}</div>
        <div class="roster-body">
          <h3 class="display-4">${esc(s.title)}</h3>
          <p>${esc(s.summary)}</p>
          <div class="roster-meta">${s.meta.map((m) => `<span class="tag">${esc(m)}</span>`).join("")}</div>
        </div>
      </div>
    `).join("");
  }

  /* ---------- engagement ledger (also reused for lab engagement models) ---------- */
  function renderEngagementLedger(sel, list) {
    const el = q(sel);
    if (!el) return;
    list = list || D.engagementModels;
    el.innerHTML = `
      <thead>
        <tr><th>Model</th><th>Best for</th><th>Format</th><th>Commitment</th></tr>
      </thead>
      <tbody>
        ${list.map((m) => `
          <tr>
            <td><strong>${esc(m.name)}</strong></td>
            <td>${esc(m.bestFor)}</td>
            <td>${esc(m.format)}</td>
            <td>${esc(m.commitment)}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
  }

  /* ---------- programmes (accordion, used on the full catalogue page) ---------- */
  function programRow(p, i) {
    return `
      <div class="accordion-item reveal" data-track="${esc(p.track)}" data-level="${esc(p.level)}" data-search="${esc((p.title + " " + p.track + " " + p.summary).toLowerCase())}">
        <button class="accordion-trigger" aria-expanded="false">
          <span class="accordion-trigger-title">
            <span class="tag">N&#176;${pad(i + 1)}</span>
            <span>${esc(p.title)}</span>
          </span>
          <span class="accordion-plus">+</span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel-inner">
            <div class="roster-meta" style="margin-top:0;">
              <span class="tag">${esc(p.track)}</span>
              <span class="tag tag--alt">${esc(p.level)}</span>
              <span class="tag">${esc(p.format)}</span>
              <span class="tag">${esc(p.duration)}</span>
              <span class="tag">Next cohort &middot; ${esc(p.cohort)}</span>
            </div>
            <p style="margin-top:1.1rem;">${esc(p.summary)}</p>
            <p class="eyebrow" style="margin-top:1.4rem;">Module breakdown</p>
            <ul>${p.modules.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
            <div style="margin-top:1.3rem;">
              <a class="btn btn-navy btn-sm" href="contact.html?programme=${encodeURIComponent(p.title)}">Request this trainer for my team</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPrograms(sel, opts) {
    const el = q(sel);
    if (!el) return;
    const limit = (opts && opts.limit) || D.programs.length;
    el.setAttribute("data-accordion-solo", "");
    el.innerHTML = D.programs.slice(0, limit).map(programRow).join("");
  }

  /* filtering used on training.html */
  function initProgramFilters(rootSel, filterBarSel) {
    const root = q(rootSel);
    if (!root) return;
    root.setAttribute("data-accordion-solo", "");
    root.innerHTML = D.programs.map(programRow).join("");

    const bar = q(filterBarSel);

    const params = new URLSearchParams(window.location.search);
    const state = { track: "All", search: params.get("q") || "" };
    const searchInput = q("[data-programs-search]");
    if (searchInput && state.search) searchInput.value = state.search;

    function apply() {
      const rows = root.querySelectorAll(".accordion-item");
      let visible = 0;
      rows.forEach((row) => {
        const trackOk = state.track === "All" || row.getAttribute("data-track") === state.track;
        const searchOk = !state.search || row.getAttribute("data-search").includes(state.search.toLowerCase());
        const show = trackOk && searchOk;
        row.style.display = show ? "" : "none";
        if (show) visible++;
      });
      const empty = q("[data-programs-empty]");
      if (empty) empty.style.display = visible ? "none" : "block";
    }

    if (bar) {
      bar.querySelectorAll("[data-track-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.track = btn.getAttribute("data-track-filter");
          bar.querySelectorAll("[data-track-filter]").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
          apply();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.search = searchInput.value.trim();
        apply();
      });
    }

    apply();
  }

  /* ---------- trending programme cards (home page teaser) ---------- */
  function renderCourseCards(sel, opts) {
    const el = q(sel);
    if (!el) return;
    const limit = (opts && opts.limit) || 3;
    const list = D.programs.slice().sort((a, b) => new Date(a.cohort) - new Date(b.cohort)).slice(0, limit);
    el.innerHTML = list.map((p) => `
      <div class="course-card reveal">
        <div class="course-card-top">
          <span class="course-pill">${esc(p.track)}</span><span class="course-pill course-pill--level">${esc(p.level)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="course-meta"><span>${esc(p.duration)}</span><span>${esc(p.format)}</span></div>
        </div>
        <div class="course-card-bottom">
          <span class="course-cohort">Next cohort<br><b>${esc(p.cohort)}</b></span>
          <a class="btn btn-outline btn-sm" href="training.html">View curriculum</a>
        </div>
      </div>
    `).join("");
  }

  /* ---------- case studies ---------- */
  function renderCaseStudies(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.caseStudies.map((c) => `
      <article class="case-card reveal">
        <span class="course-pill">${esc(c.sector)}</span>
        <h3 class="display-3" style="margin-top:0.9rem;">${esc(c.client)}</h3>
        <p style="color:var(--ink-soft); margin-top:0.4rem; font-size:0.9rem;">${esc(c.size)} &middot; ${esc(c.timeline)}</p>
        <p style="margin-top:1.2rem; max-width:70ch;">${esc(c.challenge)}</p>
        <p class="eyebrow" style="margin-top:1.4rem;">Approach</p>
        <ul class="chev-list" style="margin-top:0.4rem; max-width:70ch;">
          ${c.approach.map((a) => `<li>${esc(a)}</li>`).join("")}
        </ul>
        <div class="case-stats">
          ${c.results.map((r) => `
            <div class="case-stat">
              <span class="num">${esc(r.num)}</span>
              <span class="label">${esc(r.label)}</span>
            </div>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  /* ---------- insights: skeleton first, then swap in real content ---------- */
  function skeletonInsightRows(n) {
    return Array.from({ length: n }).map(() => `
      <div class="sk-card">
        <div class="skeleton sk-line tiny"></div>
        <div class="skeleton sk-line" style="width:85%;"></div>
        <div class="skeleton sk-line" style="width:60%;"></div>
      </div>
    `).join("");
  }

  function renderInsights(sel, opts) {
    const el = q(sel);
    if (!el) return;
    const limit = (opts && opts.limit) || D.insights.length;
    el.innerHTML = skeletonInsightRows(Math.min(limit, 4));
    window.setTimeout(() => {
      el.innerHTML = D.insights.slice(0, limit).map((a) => `
        <article class="roster-row reveal is-visible">
          <div class="roster-avatar">${esc(initials(a.category))}</div>
          <div class="roster-body">
            <div class="roster-meta" style="margin-top:0; margin-bottom:0.6rem;">
              <span class="tag">${esc(a.category)}</span>
              <span>${esc(a.date)}</span>
              <span>${esc(a.readTime)} read</span>
            </div>
            <h3 class="display-4">${esc(a.title)}</h3>
            <p style="margin-top:0.5rem;">${esc(a.excerpt)}</p>
          </div>
        </article>
      `).join("");
    }, 650 + Math.random() * 400);
  }

  /* ---------- FAQ (also reused for voucher FAQ) ---------- */
  function renderFAQ(sel, list) {
    const el = q(sel);
    if (!el) return;
    list = list || D.faqs;
    el.setAttribute("data-accordion-solo", "");
    el.innerHTML = list.map((f, i) => `
      <div class="accordion-item reveal">
        <button class="accordion-trigger" aria-expanded="false">
          <span class="accordion-trigger-title"><span class="tag">Q${pad(i + 1)}</span> ${esc(f.q)}</span>
          <span class="accordion-plus">+</span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel-inner">
            ${f.a.map((p) => `<p style="margin-top:0.5rem;">${esc(p)}</p>`).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ---------- offices ---------- */
  function renderOffices(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.offices.map((o) => `
      <div class="roster-row reveal">
        <div class="roster-avatar">${esc(o.city.slice(0, 2).toUpperCase())}</div>
        <div class="roster-body">
          <h3 class="display-4">${esc(o.city)}</h3>
          <p>${esc(o.role)}</p>
          <div class="roster-meta"><span>${esc(o.address)}</span><span>${esc(o.phone)}</span></div>
        </div>
      </div>
    `).join("");
  }

  /* ---------- open roles ---------- */
  function renderOpenRoles(sel) {
    const el = q(sel);
    if (!el) return;
    el.innerHTML = D.openRoles.map((r, i) => `
      <div class="roster-row reveal">
        <div class="roster-avatar">${pad(i + 1)}</div>
        <div class="roster-body" style="flex:1;">
          <h3 class="display-4">${esc(r.title)}</h3>
          <div class="roster-meta" style="margin-top:0.6rem;">
            <span class="tag">${esc(r.location)}</span>
            <span class="tag">${esc(r.type)}</span>
          </div>
        </div>
        <div>
          <a class="btn btn-outline btn-sm" href="mailto:careers@opentrainings.example?subject=${encodeURIComponent(r.title)}">Apply</a>
        </div>
      </div>
    `).join("");
  }

  window.OT_RENDER = {
    renderHero, renderAccreditation, renderStats, renderFeatureGrid, renderLabs,
    renderVouchers, renderTestimonials, renderSectorMarquee: function(){}, renderServices, renderEngagementLedger,
    renderPrograms, initProgramFilters, renderCourseCards, renderCaseStudies, renderInsights,
    renderFAQ, renderOffices, renderOpenRoles
  };
})();
