/* ===================================================================
   OPEN TRAININGS : forms
   Submissions POST to the Azure Functions API in /api (contact.js /
   subscribe.js), which validates them again server-side and writes
   them to Azure Table Storage. If that endpoint isn't reachable --
   e.g. running the site locally with a plain static file server,
   with no Azure Static Web Apps CLI / deployed API behind it -- the
   fetch fails and an honest error is shown rather than a fake
   success message.
   =================================================================== */

(function () {
  "use strict";

  /* Deferred to DOMContentLoaded, registered after each page's own
     inline render script, so the query-param programme prefill below
     runs against the fully populated <select> on contact.html rather
     than the single placeholder option present before that script
     appends the catalogue. */
  document.addEventListener("DOMContentLoaded", init);

  function init() {

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setError(field, msg) {
    field.classList.toggle("has-error", !!msg);
    const note = field.querySelector(".field-error");
    if (note) note.textContent = msg || "";
  }

  async function postJSON(url, payload) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    let data = {};
    try { data = await res.json(); } catch { /* non-JSON error page, e.g. a 404 with no API deployed */ }
    if (!res.ok) throw new Error(data.error || "Could not reach the registry right now. Please try again shortly or email register@opentrainings.example directly.");
    return data;
  }

  /* ---------- contact form ---------- */
  const contactForm = document.querySelector('[data-form="contact"]');
  if (contactForm) {
    const status = contactForm.querySelector(".form-status");
    const submitBtn = contactForm.querySelector('[type="submit"]');

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      const nameField = contactForm.querySelector('[data-field="name"]');
      const emailField = contactForm.querySelector('[data-field="email"]');
      const companyField = contactForm.querySelector('[data-field="company"]');
      const sizeField = contactForm.querySelector('[data-field="size"]');
      const programmeField = contactForm.querySelector('[data-field="programme"]');
      const messageField = contactForm.querySelector('[data-field="message"]');

      const nameVal = nameField.querySelector("input").value.trim();
      const emailVal = emailField.querySelector("input").value.trim();
      const messageVal = messageField.querySelector("textarea").value.trim();

      setError(nameField, nameVal ? "" : "Tell us who we're speaking with.");
      if (!nameVal) ok = false;

      if (!emailVal) { setError(emailField, "A work email lets us route this to the right desk."); ok = false; }
      else if (!isEmail(emailVal)) { setError(emailField, "That doesn't look like a valid email address."); ok = false; }
      else setError(emailField, "");

      setError(messageField, messageVal.length >= 10 ? "" : "A couple of sentences on what you need is enough to start.");
      if (messageVal.length < 10) ok = false;

      if (!ok) {
        status.className = "form-status is-visible";
        status.textContent = "A couple of fields need a second look before this can be logged.";
        return;
      }

      submitBtn.setAttribute("disabled", "disabled");
      status.className = "form-status is-visible is-sending";
      status.textContent = "Logging your request in the intake register…";

      postJSON("/api/contact", {
        name: nameVal,
        email: emailVal,
        message: messageVal,
        company: companyField ? companyField.querySelector("input").value.trim() : "",
        size: sizeField ? sizeField.querySelector("select").value : "",
        programme: programmeField ? programmeField.querySelector("select").value : ""
      }).then((data) => {
        status.className = "form-status is-visible is-success";
        status.textContent = "Request " + data.reference + " logged. A regional desk lead will follow up within two working days.";
        contactForm.reset();
      }).catch((err) => {
        status.className = "form-status is-visible";
        status.textContent = err.message || "Could not log the request right now. Please try again or email register@opentrainings.example directly.";
      }).finally(() => {
        submitBtn.removeAttribute("disabled");
      });
    });
  }

  /* ---------- newsletter form (footer, present on every page) ---------- */
  document.querySelectorAll('[data-form="newsletter"]').forEach((form) => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const val = input.value.trim();
      if (!isEmail(val)) {
        status.className = "form-status is-visible";
        status.textContent = "Enter a valid email to join the briefing list.";
        return;
      }
      status.className = "form-status is-visible is-sending";
      status.textContent = "Adding you to the register…";
      postJSON("/api/subscribe", { email: val }).then(() => {
        status.className = "form-status is-visible is-success";
        status.textContent = "Added. First briefing lands next publishing cycle.";
        form.reset();
      }).catch((err) => {
        status.className = "form-status is-visible";
        status.textContent = err.message || "Could not add you to the list right now. Please try again.";
      });
    });
  });

  /* ---------- pre-fill programme interest from ?programme= query param ---------- */
  const params = new URLSearchParams(window.location.search);
  const programmeParam = params.get("programme");
  if (programmeParam) {
    const target = document.querySelector('[data-field="programme"] select, [data-field="programme"] input');
    if (target) {
      if (target.tagName === "SELECT") {
        const opt = Array.from(target.options).find((o) => o.value === programmeParam);
        if (opt) target.value = programmeParam;
        else target.value = target.options[0].value;
      } else {
        target.value = programmeParam;
      }
    }
  }

  } // end init

})();
