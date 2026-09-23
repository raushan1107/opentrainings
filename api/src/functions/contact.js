/* ===================================================================
   POST /api/contact
   Validates a contact-form submission and writes it to Azure Table
   Storage (table "ContactRequests"), so requests survive as real,
   queryable rows instead of living only in the browser. Returns the
   same OT-YYYY-NNNNN reference format the front end already shows.
   =================================================================== */

const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TABLE_NAME = "ContactRequests";

function refNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `OT-${year}-${rand}`;
}

function clean(v) {
  return typeof v === "string" ? v.trim().slice(0, 4000) : "";
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
    const message = clean(body.message);
    const company = clean(body.company);
    const size = clean(body.size);
    const programme = clean(body.programme);

    if (!name || !EMAIL_RE.test(email) || message.length < 10) {
      return {
        status: 400,
        jsonBody: { error: "Name, a valid work email, and a message of at least 10 characters are required." }
      };
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      context.error("AZURE_STORAGE_CONNECTION_STRING is not set in the Static Web App's configuration.");
      return {
        status: 500,
        jsonBody: { error: "The registry desk isn't configured to receive requests yet. Please email register@opentrainings.example directly." }
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
        company,
        teamSize: size,
        programme,
        message,
        submittedAt: new Date().toISOString(),
        source: request.headers.get("referer") || ""
      });
    } catch (err) {
      context.error("Failed to write contact submission:", err);
      return {
        status: 502,
        jsonBody: { error: "Could not log the request right now. Please try again or email register@opentrainings.example directly." }
      };
    }

    return { status: 200, jsonBody: { ok: true, reference } };
  }
});
