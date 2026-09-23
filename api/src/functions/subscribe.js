/* ===================================================================
   POST /api/subscribe
   Adds an email to the briefing-list table. Kept as a separate,
   smaller table from ContactRequests since it's a different kind of
   record (ongoing list membership, not a one-off request) and callers
   may want to export it separately for a mailing tool later.
   =================================================================== */

const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TABLE_NAME = "Subscribers";

app.http("subscribe", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "subscribe",
  handler: async (request, context) => {
    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: "Request body must be JSON." } };
    }

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 320) : "";
    if (!EMAIL_RE.test(email)) {
      return { status: 400, jsonBody: { error: "A valid email is required." } };
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      context.error("AZURE_STORAGE_CONNECTION_STRING is not set in the Static Web App's configuration.");
      return { status: 500, jsonBody: { error: "Signups aren't wired up yet. Please try again later." } };
    }

    // rowKey must be a valid Table Storage key: no '/', '\\', '#', '?', or control characters.
    const rowKey = email.toLowerCase().replace(/[/\\#?]/g, "_");

    try {
      const table = TableClient.fromConnectionString(connectionString, TABLE_NAME);
      await table.createTable().catch((err) => {
        if (err.statusCode !== 409) throw err;
      });

      await table.upsertEntity({
        partitionKey: "subscriber",
        rowKey,
        email,
        subscribedAt: new Date().toISOString()
      }, "Merge");
    } catch (err) {
      context.error("Failed to write subscriber:", err);
      return { status: 502, jsonBody: { error: "Could not add you to the list right now. Please try again." } };
    }

    return { status: 200, jsonBody: { ok: true } };
  }
});
