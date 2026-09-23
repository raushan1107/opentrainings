/* ===================================================================
   GET /api/ping
   Trivial diagnostic endpoint: no dependencies, no env var checks, just
   a fixed JSON response. Used to isolate whether Static Web Apps'
   managed Functions integration is failing to register ANY function
   added after the original deploy (contact.js/subscribe.js), or
   whether the problem is specific to admin-contacts.js. Safe to delete
   once admin-contacts.js is confirmed working.
   =================================================================== */

const { app } = require("@azure/functions");

app.http("ping", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "ping",
  handler: async () => ({ status: 200, jsonBody: { ok: true, at: new Date().toISOString() } })
});
