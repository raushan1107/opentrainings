/* ===================================================================
   GET /api/admin-contacts
   Returns every logged contact-form submission, newest first, for the
   admin.html dashboard. Gated by a shared secret (the ADMIN_KEY app
   setting) checked against the "x-admin-key" request header, since
   Static Web Apps' managed API doesn't enforce per-Function auth
   levels the way a standalone Function App does -- the check has to
   happen in code here, not via the "authLevel" option below.

   Route is a flat single segment ("admin-contacts"), not a nested one
   ("admin/contacts") -- Static Web Apps' managed Functions integration
   was silently 404-ing on the nested route (function-app logs showed it
   loading fine; the request just never reached it), while the two
   flat-route functions (contact, subscribe) worked the whole time. If
   you add more admin endpoints later, keep them flat for the same
   reason unless a future SWA release fixes nested custom routes.
   =================================================================== */

const { app } = require("@azure/functions");
const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = "ContactRequests";

app.http("admin-contacts", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "admin-contacts",
  handler: async (request, context) => {
    // Trimmed on both sides: a trailing space or newline picked up while
    // copy-pasting the key into the Azure Portal (or into the admin.html
    // prompt) is a common, invisible way for an otherwise-correct key to
    // fail this comparison.
    const adminKey = (process.env.ADMIN_KEY || "").trim();
    if (!adminKey) {
      context.error("ADMIN_KEY is not set in the Static Web App's configuration.");
      return { status: 500, jsonBody: { error: "The admin dashboard isn't configured yet." } };
    }

    const suppliedKey = (request.headers.get("x-admin-key") || "").trim();
    if (suppliedKey !== adminKey) {
      return { status: 401, jsonBody: { error: "Incorrect admin key." } };
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      context.error("AZURE_STORAGE_CONNECTION_STRING is not set in the Static Web App's configuration.");
      return { status: 500, jsonBody: { error: "Storage isn't configured yet, so there's nothing to show." } };
    }

    try {
      const table = TableClient.fromConnectionString(connectionString, TABLE_NAME);
      const items = [];
      for await (const entity of table.listEntities()) {
        items.push({
          reference: entity.rowKey,
          name: entity.name || "",
          email: entity.email || "",
          phone: entity.phone || "",
          whatsapp: entity.whatsapp || entity.phone || "",
          company: entity.company || "",
          teamSize: entity.teamSize || "",
          preferredContact: entity.preferredContact || "",
          need: entity.need || "",
          programme: entity.programme || "",
          message: entity.message || "",
          submittedAt: entity.submittedAt || "",
          source: entity.source || ""
        });
      }
      items.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      return { status: 200, jsonBody: { items } };
    } catch (err) {
      context.error("Failed to list contact submissions:", err);
      return { status: 502, jsonBody: { error: "Could not load submissions right now. Please try again shortly." } };
    }
  }
});
