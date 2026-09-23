/* ===================================================================
   POST /api/contact
   Validates a contact-form submission and writes it to Azure Table
   Storage (table "ContactRequests"), so requests survive as real,
   queryable rows instead of living only in the browser. Returns the
   same OT-YYYY-NNNNN reference format the front end already shows.
   =================================================================== */

const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");
const nodemailer = require("nodemailer");
const { buildConfirmationEmail } = require("../lib/confirmationEmail");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;
const TABLE_NAME = "ContactRequests";

function refNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `OT-${year}-${rand}`;
}

function clean(v) {
  return typeof v === "string" ? v.trim().slice(0, 4000) : "";
}

/* Best-effort: a client's request is already logged in Table Storage by
   the time this runs, so an email failure (or SMTP not being configured
   at all, e.g. in local dev) is logged and swallowed rather than turned
   into a 502 -- the submission itself must not depend on email working. */
async function sendConfirmationEmail(context, data) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    context.warn("SMTP_HOST/SMTP_USER/SMTP_PASS not set -- skipping confirmation email (the request was still logged).");
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
    const { subject, html, text } = buildConfirmationEmail(data);
    await transporter.sendMail({
      from: SMTP_FROM || `"Open Trainings" <${SMTP_USER}>`,
      to: data.email,
      subject,
      text,
      html
    });
  } catch (err) {
    context.error("Failed to send confirmation email:", err);
  }
}

app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "contact",
  handler: async (request, context) => {
    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: "Request body must be JSON." } };
    }

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const whatsapp = clean(body.whatsapp);
    const message = clean(body.message);
    const company = clean(body.company);
    const size = clean(body.size);
    const preferredContact = clean(body.preferredContact);
    const programme = clean(body.programme);
    const need = clean(body.need);

    if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !company || message.length < 10) {
      return {
        status: 400,
        jsonBody: { error: "Name, a valid email, a valid phone number, a company, and a message of at least 10 characters are required." }
      };
    }
    if (whatsapp && !PHONE_RE.test(whatsapp)) {
      return { status: 400, jsonBody: { error: "That doesn't look like a valid WhatsApp number." } };
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      context.error("AZURE_STORAGE_CONNECTION_STRING is not set in the Static Web App's configuration.");
      return {
        status: 500,
        jsonBody: { error: "The request desk isn't configured to receive requests yet. Please email info@opentrainings.org directly." }
      };
    }

    const reference = refNumber();

    try {
      const table = TableClient.fromConnectionString(connectionString, TABLE_NAME);
      await table.createTable().catch((err) => {
        if (err.statusCode !== 409) throw err; // 409 = table already exists
      });

      await table.createEntity({
        partitionKey: new Date().toISOString().slice(0, 7), // e.g. "2026-09", keeps rows sortable/browsable by month
        rowKey: reference,
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        company,
        teamSize: size,
        preferredContact,
        need,
        programme,
        message,
        submittedAt: new Date().toISOString(),
        source: request.headers.get("referer") || ""
      });
    } catch (err) {
      context.error("Failed to write contact submission:", err);
      return {
        status: 502,
        jsonBody: { error: "Could not log the request right now. Please try again or email info@opentrainings.org directly." }
      };
    }

    await sendConfirmationEmail(context, { name, email, reference, need, programme, message });

    return { status: 200, jsonBody: { ok: true, reference } };
  }
});
