/* ===================================================================
   Confirmation email sent to a client right after they submit the
   contact form. Kept as its own module so the template can be edited
   without touching contact.js's request-handling logic.

   Written as an email-safe table layout with inline styles (not the
   site's stylesheet) because most mail clients strip <style> blocks
   and ignore modern CSS -- this is the same navy/blue palette as
   style.css, just hand-carried into a format Outlook/Gmail render
   consistently.
   =================================================================== */

const NEED_LABELS = {
  training: "Training — book a trainer",
  infra: "Training Infra — classroom, travel, food, workspace",
  labs: "Labs — a hands-on lab environment",
  vouchers: "Vouchers — certification exam vouchers"
};

const CONTACT_PHONE = "+91 86 7945 0045";
const CONTACT_PHONE_TEL = "+918679450045";
const CONTACT_EMAIL = "info@opentrainings.org";

function esc(v) {
  return String(v || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function buildConfirmationEmail({ name, reference, need, programme, message }) {
  const needLabel = NEED_LABELS[need] || "General enquiry";
  const subject = `We've received your request — ${reference}`;

  const text = [
    `Hi ${name},`,
    "",
    `Thanks for reaching out to Open Trainings. Your request has been logged with reference ${reference}.`,
    "",
    "What you told us:",
    `- Interested in: ${needLabel}`,
    programme ? `- Programme: ${programme}` : null,
    `- Message: ${message}`,
    "",
    "A member of our team will follow up within two working days. If it's urgent, reach us directly:",
    `Phone / WhatsApp: ${CONTACT_PHONE}`,
    `Email: ${CONTACT_EMAIL}`,
    "",
    "— Open Trainings"
  ].filter((line) => line !== null).join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0; padding:0; background:#f4f9ff;">
    <div style="background:#f4f9ff; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e3e9f1;">
        <tr>
          <td style="background:#004077; padding:24px 32px;">
            <span style="color:#ffffff; font-size:18px; font-weight:800; letter-spacing:-0.01em;">Open Trainings</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px; font-size:15px; color:#16181d;">Hi ${esc(name)},</p>
            <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#16181d;">
              Thanks for reaching out to <strong>Open Trainings</strong>. Your request has been logged with reference
              <strong style="color:#005294;">${esc(reference)}</strong>.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f9ff; border-radius:10px; margin:0 0 20px;">
              <tr>
                <td style="padding:16px 20px; font-size:13px; color:#55606e; line-height:1.7;">
                  <strong style="color:#002e55;">Interested in:</strong> ${esc(needLabel)}<br>
                  ${programme ? `<strong style="color:#002e55;">Programme:</strong> ${esc(programme)}<br>` : ""}
                  <strong style="color:#002e55;">Message:</strong> ${esc(message)}
                </td>
              </tr>
            </table>
            <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#16181d;">
              A member of our team will follow up within <strong>two working days</strong>. If it's urgent, reach us directly:
            </p>
            <p style="margin:0 0 24px; font-size:14px; line-height:1.9;">
              Phone / WhatsApp: <a href="tel:${CONTACT_PHONE_TEL}" style="color:#005294; text-decoration:none;">${CONTACT_PHONE}</a><br>
              Email: <a href="mailto:${CONTACT_EMAIL}" style="color:#005294; text-decoration:none;">${CONTACT_EMAIL}</a>
            </p>
            <p style="margin:0; font-size:13px; color:#8891a0;">— The Open Trainings team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#002e55; padding:18px 32px; text-align:center;">
            <span style="color:rgba(255,255,255,0.6); font-size:11px;">Open Trainings &middot; Noida, India</span>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;

  return { subject, html, text };
}

module.exports = { buildConfirmationEmail };
