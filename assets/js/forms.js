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
  function isPhone(v) { return /^[+\d][\d\s()-]{6,19}$/.test(v); }

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
    if (!res.ok) throw new Error(data.error || "Could not reach us right now. Please try again shortly or email info@opentrainings.org directly.");
    return data;
  }

  /* ---------- contact form ---------- */
  const contactForm = document.querySelector('[data-form="contact"]');
  if (contactForm) {
    const status = contactForm.querySelector(".form-status");
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const thanksPanel = document.querySelector("[data-thanks]");
    const thanksBody = document.querySelector("[data-thanks-body]");
    const thanksReset = document.querySelector("[data-thanks-reset]");

    /* WhatsApp: "same as phone" checkbox hides/shows the separate input,
       and toggling it off focuses the newly-revealed field. */
    const whatsappField = contactForm.querySelector('[data-field="whatsapp"]');
    const whatsappSame = document.getElementById("c-whatsapp-same");
    const whatsappInputWrap = document.querySelector("[data-whatsapp-input]");
    if (whatsappSame && whatsappInputWrap) {
      const syncWhatsappVisibility = () => {
        const same = whatsappSame.checked;
        whatsappInputWrap.style.display = same ? "none" : "block";
        if (same) setError(whatsappField, "");
      };
      whatsappSame.addEventListener("change", () => {
        syncWhatsappVisibility();
        if (!whatsappSame.checked) contactForm.querySelector("#c-whatsapp").focus();
      });
      syncWhatsappVisibility();
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      const nameField = contactForm.querySelector('[data-field="name"]');
      const emailField = contactForm.querySelector('[data-field="email"]');
      const phoneField = contactForm.querySelector('[data-field="phone"]');
      const companyField = contactForm.querySelector('[data-field="company"]');
      const sizeField = contactForm.querySelector('[data-field="size"]');
      const preferredField = contactForm.querySelector('[data-field="preferredContact"]');
      const needField = contactForm.querySelector('[data-field="need"]');
      const programmeField = contactForm.querySelector('[data-field="programme"]');
      const messageField = contactForm.querySelector('[data-field="message"]');

      const nameVal = nameField.querySelector("input").value.trim();
      const emailVal = emailField.querySelector("input").value.trim();
      const phoneVal = phoneField.querySelector("input").value.trim();
      const companyVal = companyField.querySelector("input").value.trim();
      const sameWhatsapp = !whatsappSame || whatsappSame.checked;
      const whatsappVal = sameWhatsapp ? "" : contactForm.querySelector("#c-whatsapp").value.trim();
      const messageVal = messageField.querySelector("textarea").value.trim();

      setError(nameField, nameVal ? "" : "Tell us who we're speaking with.");
      if (!nameVal) ok = false;

      if (!emailVal) { setError(emailField, "An email lets us route this to the right desk."); ok = false; }
      else if (!isEmail(emailVal)) { setError(emailField, "That doesn't look like a valid email address."); ok = false; }
      else setError(emailField, "");

      if (!phoneVal) { setError(phoneField, "A phone number lets us call or WhatsApp you back."); ok = false; }
      else if (!isPhone(phoneVal)) { setError(phoneField, "That doesn't look like a valid phone number."); ok = false; }
      else setError(phoneField, "");

      if (!sameWhatsapp) {
        if (!whatsappVal) { setError(whatsappField, "Enter your WhatsApp number, or check the box above if it's the same as your phone."); ok = false; }
        else if (!isPhone(whatsappVal)) { setError(whatsappField, "That doesn't look like a valid WhatsApp number."); ok = false; }
        else setError(whatsappField, "");
      }

      setError(companyField, companyVal ? "" : "Tell us which company this is for.");
      if (!companyVal) ok = false;

      setError(messageField, messageVal.length >= 10 ? "" : "A couple of sentences on what you need is enough to start.");
      if (messageVal.length < 10) ok = false;

      if (!ok) {
        status.className = "form-status is-visible";
        status.textContent = "A couple of fields need a second look before this can be logged.";
        return;
      }

      submitBtn.setAttribute("disabled", "disabled");
      status.className = "form-status is-visible is-sending";
      status.textContent = "Sending your request…";

      postJSON("/api/contact", {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        whatsapp: whatsappVal,
        message: messageVal,
        company: companyVal,
        size: sizeField ? sizeField.querySelector("select").value : "",
        preferredContact: preferredField ? preferredField.querySelector("select").value : "",
        need: needField ? needField.querySelector("select").value : "",
        programme: programmeField ? programmeField.querySelector("select").value : ""
      }).then((data) => {
        status.className = "form-status";
        status.textContent = "";
        if (thanksPanel) {
          if (thanksBody) {
            thanksBody.textContent = "Request " + data.reference + " is logged, and a confirmation has been sent to " + emailVal +
              ". A regional desk lead will follow up within two working days.";
          }
          contactForm.style.display = "none";
          thanksPanel.style.display = "block";
        } else {
          status.className = "form-status is-visible is-success";
          status.textContent = "Request " + data.reference + " logged. A regional desk lead will follow up within two working days.";
        }
        contactForm.reset();
        if (whatsappSame) { whatsappSame.checked = true; whatsappInputWrap.style.display = "none"; }
      }).catch((err) => {
        status.className = "form-status is-visible";
        status.textContent = err.message || "Could not log the request right now. Please try again or email info@opentrainings.org directly.";
      }).finally(() => {
        submitBtn.removeAttribute("disabled");
      });
    });

    if (thanksReset && thanksPanel) {
      thanksReset.addEventListener("click", () => {
        thanksPanel.style.display = "none";
        contactForm.style.display = "block";
      });
    }
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
      status.textContent = "Adding you to the list…";
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
