# Setting up the automated confirmation email

When someone submits the contact form, `api/src/functions/contact.js` can
send them an automatic confirmation email (their reference number, what
they asked about, and how to reach us directly — the template lives in
`api/src/lib/confirmationEmail.js`). It's off by default: nothing sends
until you add five settings, and if they're missing the form still works
exactly as before, it just skips the email and logs a warning.

This guide gets it working using a normal Gmail account, since that's the
fastest path to a working proof of concept with no new account to sign up
for. A second option (SendGrid) is at the bottom for when you outgrow it.

## What you're setting up

Five app settings, all read by `contact.js` at request time:

| Setting | What it is |
|---|---|
| `SMTP_HOST` | The mail server address (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | `587` (works for every option below) |
| `SMTP_USER` | The mailbox that sends the email (e.g. `you@gmail.com`) |
| `SMTP_PASS` | An **app password** for that mailbox — not your normal login password |
| `SMTP_FROM` | What the client sees as the sender, e.g. `"Open Trainings" <you@gmail.com>` |

## Option A: Gmail (fastest to set up)

Gmail won't accept your normal password for this — it requires a 16-character
**app password**, which only works once 2-Step Verification is turned on.

1. **Turn on 2-Step Verification**, if it isn't already:
   [myaccount.google.com/security](https://myaccount.google.com/security) →
   "2-Step Verification" → follow the prompts.
2. **Create an app password**:
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   → name it something like `Open Trainings site` → Gmail shows you a
   16-character password (spaces don't matter, e.g. `abcd efgh ijkl mnop`).
   Copy it now — Gmail won't show it again.
3. **Note your five values**:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = the Gmail address you generated the app password for
   - `SMTP_PASS` = the 16-character app password from step 2 (spaces are fine to leave in or strip out, either works)
   - `SMTP_FROM` = `"Open Trainings" <your-gmail-address>`

Gmail caps free accounts at **500 emails/day**, which is fine for a
contact-form volume. If you outgrow that, move to Option B.

## Option B: SendGrid (for real production volume)

SendGrid's free tier includes an SMTP relay with better deliverability and
no daily-cap surprise once you're past the proof-of-concept stage.

1. Sign up at [sendgrid.com](https://sendgrid.com) (free tier is enough to
   start).
2. **Settings → API Keys → Create API Key** → give it "Mail Send" access
   only → copy the key it shows you once.
3. Your five values:
   - `SMTP_HOST` = `smtp.sendgrid.net`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = literally the word `apikey` (not your SendGrid username)
   - `SMTP_PASS` = the API key from step 2
   - `SMTP_FROM` = an address on a domain you've **verified** in SendGrid
     (Settings → Sender Authentication) — SendGrid will reject sends from
     an unverified domain, which Gmail doesn't require for Option A.

## Adding the settings to Azure

Same place `ADMIN_KEY` and `AZURE_STORAGE_CONNECTION_STRING` already live:

1. Azure Portal → your Static Web App resource (**not** a separate Function
   App — this project's API is the *managed* API of the Static Web App).
2. Left sidebar → **Configuration**.
3. **+ Add** an application setting for each of the five names above, with
   the values you noted. Names must match exactly (`SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) — the code reads them by these
   exact names via `process.env`.
4. **Save**. Static Web Apps applies application settings without needing a
   new deployment, but if a test right after saving doesn't pick it up,
   wait a minute and retry — the Functions host occasionally needs a moment
   to restart.

## Testing it

1. Submit the contact form on the live site with an email address you can
   actually check.
2. You should see the on-page "Thanks — we've got it" panel either way —
   that only depends on the request being logged, not the email sending.
3. Check that inbox (and spam folder, especially on the first send from a
   brand-new sender).
4. If the email never arrives, check the Function's logs: Azure Portal →
   the Static Web App → **Functions** (or **Log stream**) → look for either
   `"SMTP_HOST/SMTP_USER/SMTP_PASS not set"` (settings didn't save/aren't
   named exactly right) or `"Failed to send confirmation email"` followed
   by the actual SMTP error (wrong password, blocked port, unverified
   sender domain, etc.).

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Log says settings "not set" | A setting name is misspelled, or it was added to the wrong resource |
| SMTP error `535` / `Invalid login` | Using your normal password instead of an app password (Gmail), or the wrong `SMTP_USER` for SendGrid (should be `apikey`) |
| Email sends but lands in spam | Normal for a brand-new sending domain on Option A; Option B's sender verification helps here |
| Nothing in the logs at all | The request never reached `contact.js` — check the contact form itself is submitting successfully (reference number shown) before troubleshooting email specifically |

## Turning it off again

Delete the five app settings (or just `SMTP_HOST`) from the Static Web
App's Configuration. `contact.js` checks for them on every request and
silently skips sending if they're missing — no code change needed either
way.
