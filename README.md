# Open Trainings — project overview

## What this is

A multi-page marketing website for **Open Trainings**, a corporate training
company. The brief was to build something in the same category as
[mankindconsulting.com](https://www.mankindconsulting.com/) — a training and
consulting firm that showcases its services, its course catalogue, its
delivery record and its team — but as its own brand, with its own visual
language, not a reskin of that site.

Mankind Consulting's public site was used only as a **structural** reference
(nav pattern: About / Services / Courses / Career / Contact; homepage pattern:
services grid, delivery-footprint stat, client proof, footer). None of its
copy, imagery or design was reused. Open Trainings is a fictional company
built out with its own history, offices, staff, programmes and case studies
so the site has real content to render instead of lorem ipsum.

## The idea behind the company

Open Trainings is positioned as a **training registrar**, not a generic
"corporate training provider." The conceit that shapes both the copy and the
visual design: this is an organisation that runs training the way a
registrar's office runs — diagnostic before proposal, baseline assessment
before delivery, dated certificate and a cohort report after. That idea (a
registrar's ledger, ruled paper, stamped certificates, catalogue numbers)
is also where the visual design comes from — see **Design system** below.

## Design brief this was built against

The site had an explicit constraint list: avoid the ~30 visual/copy patterns
that make most AI-generated sites look identical to each other (harsh
gradients, Lucide-style icon packs, pure white backgrounds, 3-card feature
grids, soft rounded corners, drop shadows, purple/black color schemes, bento
grids, checkmark bullets, 3-tier pricing, fake testimonials, em dashes,
Inter/Geist/Space Grotesk, and so on), and to genuinely miss a Terms of
Service or Privacy Policy page.

What was built instead, deliberately:

- **Editorial "registrar" aesthetic** — warm parchment backgrounds, hairline
  rules instead of card borders, sharp (not rounded) corners, no drop
  shadows, a circular ink-stamp motif standing in for a logomark/icon set.
- **Typography**: [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (an expressive serif) for headlines, [Archivo](https://fonts.google.com/specimen/Archivo)
  for body/UI text, and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  for numbers, dates and ledger-style labels — not Inter, Geist or Space
  Grotesk.
- **Lists instead of card grids** — services, programmes, case studies, team
  and FAQ are all rendered as numbered "roster rows" (`N° 01`, `N° 02`, ...)
  rather than 3-across icon cards.
- **No pricing tiers** — engagement options are shown as a comparison table
  (`services.html#engagement`) of three models (open cohort / private
  in-house / ongoing partnership), not a 3-column pricing block with a
  highlighted "popular" plan.
- **No fake testimonials** — instead, `work.html` presents anonymised,
  metric-driven case studies (sector, scale, approach, measured result),
  which is how consulting firms usually present proof without a client's
  permission to use their name and headshot.
- **Real "product demos"** — the certificate mock-up on `programmes.html`,
  the module-by-module curriculum breakdown inside each programme's
  accordion, and the working catalogue filter/search are there so the site
  demonstrates the actual product (a training programme) rather than just
  describing it.
- **Skeleton loaders** — the Insights list renders a loading skeleton before
  swapping in the real articles, simulating a live data fetch.
- **Terms of Service and Privacy Policy** are real, full pages
  (`terms.html`, `privacy.html`), not omitted.

## A note on the visual design

The design described above was the first version. It was later replaced, at
the user's explicit request, with a close match to
[thequantumwhale.com](https://www.thequantumwhale.com/)'s actual visual
language (pulled from that site's real CSS and screenshots, not guessed):
Geist typeface, navy/blue/cyan/amber on white, rounded shadowed cards, pill
buttons and search bars, a photographic hero carousel, and a sticky bottom
contact bar. That override was confirmed with the user before the rebuild,
since it reverses several of the original anti-generic-AI-site constraints
above (e.g. Geist was explicitly banned in the first brief, then explicitly
requested). The content model, page structure and `data.js`/`render.js`
split described below didn't change, only the CSS and markup skin.

## Tech stack

Plain **HTML5 + hand-written CSS + vanilla JavaScript**. No Tailwind/Bootstrap
build step, no framework, no bundler — deliberately, since utility-class
frameworks tend to nudge every project toward the same look this brief was
trying to avoid. Everything runs by opening the files directly or serving the
folder with any static file server; there is no build/install step.

- `assets/css/style.css` — the entire design system: color tokens, type
  scale, the roster/accordion/tabs/ledger/skeleton components, the
  registration-mark and stamp motifs, responsive rules.
- `assets/js/data.js` — all site content (services, the 12-programme
  catalogue, case studies, insights articles, team, FAQ, office locations,
  open roles) as one JS object, `window.OT_DATA`. This is the file to edit
  to change what the site says.
- `assets/js/render.js` — turns `OT_DATA` into DOM (roster rows, the
  engagement-model ledger table, the programme catalogue with its
  track/search filtering, the case-study cards, the skeleton→content swap on
  Insights, team/FAQ/offices/open-roles lists). Exposed as `window.OT_RENDER`.
  This is what makes the site "dynamic" rather than static markup: every
  list on every page is generated from data at load time.
- `assets/js/forms.js` — client-side validation, then a real `fetch` POST to
  `/api/contact` or `/api/subscribe` (see **Backend** below). Shows the
  server's actual response (a generated reference number on success, or an
  honest error if the API isn't reachable) rather than a simulated one.
- `assets/js/main.js` — shared behaviour used on every page: mobile nav, nav
  dropdown toggling, the hero carousel (autoplay + dot navigation), the
  sticky contact bar (rendered once here from a small config array, instead
  of being duplicated in every HTML file), scroll-reveal, animated stat
  counters, and the delegated accordion/tab logic.

Each page loads these in a fixed order — `data.js`, `render.js`, an inline
per-page script that calls the render functions it needs, then `forms.js`
and `main.js` — and `forms.js`/`main.js` both wait for `DOMContentLoaded`
*registered after* that inline script, so they only wire up animations,
counters and query-param prefills once the page's own dynamic content
actually exists in the DOM.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home. Hero, sector marquee, headline stats, a 4-service teaser, next open cohorts, one featured case study, three field notes. |
| `services.html` | All six services, the three engagement models (ledger table, not pricing cards), the diagnostic-to-report process, FAQ. |
| `programmes.html` | The full 12-programme catalogue: filterable by track, searchable, each row expands into a module breakdown. Includes the sample-certificate mock-up. |
| `work.html` | Five anonymised case studies with sector, scale, approach and measured results. |
| `insights.html` | Field-notes/article index, loads via a skeleton state before the list renders. |
| `about.html` | Company story, four operating commitments, the programme-design/delivery leadership roster. |
| `careers.html` | Hiring philosophy and current open roles. |
| `contact.html` | Intake form (validated, simulated submission) and the three regional registry desks (Bangalore, Dubai, Nairobi). |
| `terms.html` | Terms of Service. |
| `privacy.html` | Privacy Policy, including how cohort/assessment data is handled and reported to sponsoring employers. |

## Running it locally

No install step. From the project folder:

```bash
python -m http.server 8000
```

then open `http://localhost:8000/index.html`. Opening the HTML files
directly from disk (`file://`) also works, since nothing depends on `fetch`
against local JSON — all content is loaded as a plain `<script>` global.

## Backend: contact form & newsletter signup

Submissions are written to **Azure Table Storage** by two **Azure
Functions**, deployed as the managed API of an **Azure Static Web App** —
chosen because the site deploys via GitHub Actions to Azure, and Static Web
Apps builds and deploys a `/api` folder as part of the exact same workflow,
with no separate backend hosting to set up.

```
api/
  src/functions/contact.js     POST /api/contact   -> writes to the "ContactRequests" table
  src/functions/subscribe.js   POST /api/subscribe  -> writes to the "Subscribers" table
  host.json, package.json
  local.settings.json.example  (copy to local.settings.json for local dev; that file is gitignored)
.github/workflows/azure-static-web-apps.yml
```

Both functions validate the input again server-side (never trust the
client), then write one row per submission with a timestamp. `contact.js`
also returns the `OT-YYYY-NNNNN` reference number the front end displays.

**To actually go live, from your side (I can't provision Azure resources or
push to GitHub from here):**

1. Push this folder to a GitHub repo.
2. In the Azure Portal, create a **Static Web App** resource, connect it to
   that repo/branch. This step auto-generates a GitHub Actions workflow and
   an `AZURE_STATIC_WEB_APPS_API_TOKEN` repo secret for you — if it writes
   its own workflow file, use that one (it'll be nearly identical to
   `.github/workflows/azure-static-web-apps.yml`, which is included as a
   fallback in case you'd rather wire the secret up yourself via
   `az staticwebapp secrets`).
3. Create an **Azure Storage Account** (Table Storage is enabled by
   default on any general-purpose account — no extra product to add).
4. In the Static Web App's **Configuration → Application settings**, add
   `AZURE_STORAGE_CONNECTION_STRING` with that storage account's connection
   string (Storage Account → Access keys in the portal). Without this, both
   endpoints return a clear 500 error instead of silently failing.
5. Push to `main` — the workflow builds and deploys automatically.

**Local development:** opening the site with a plain static server (as
described above) means `/api/*` doesn't exist, so the forms will show a real
"could not log the request" error on submit — that's the honest failure
mode, not a bug. To test the API locally you need the [Azure Functions Core
Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)
(`func start` from inside `api/`, with a real `local.settings.json`) or the
[SWA CLI](https://azure.github.io/static-web-apps-cli/) running both
together.

## Live deployment

Deployed and verified working end-to-end (both `/api/contact` and
`/api/subscribe` tested against the live URL, confirmed writing real rows to
Table Storage, test rows then deleted):

| | |
|---|---|
| Site | https://thankful-flower-071df8710.5.azurestaticapps.net/ |
| Resource group | `rg-opentrainings` (Central US) |
| Static Web App | `opentrainings` — **Free** tier |
| Storage account | `stopentrainings` — **Standard_LRS**, StorageV2, Cool access tier |
| Tables | `ContactRequests`, `Subscribers` (created automatically on first write) |
| Repo | https://github.com/raushan1107/opentrainings |

Both SKUs are the cheapest available for this shape of workload: the Static
Web App Free tier costs nothing (100GB bandwidth/month, managed Functions
included), and Table Storage on Standard_LRS bills per-use with no minimum —
at contact-form volume this runs to a few cents a month, if that. There is
no App Service Plan, VM, or database server involved anywhere.

Every push to `main` redeploys automatically via
`.github/workflows/azure-static-web-apps.yml`.

## Editing content

Almost everything a non-developer would want to change (services, the
programme catalogue, case studies, team bios, FAQ, office addresses, stats)
lives in `assets/js/data.js` as plain JS objects/arrays — edit that file and
every page pulling from it updates automatically, no HTML editing required.

## Known gaps / good next steps

- All photography is deliberately absent (no stock photos, to avoid the
  generic-AI-site look) — if real photos of facilitators, sessions or
  offices become available, they'd slot naturally into the `about.html`
  team roster and the `work.html` case studies.
- The Azure resources described in **Backend** above (Static Web App,
  Storage Account, the connection-string app setting) haven't been
  provisioned yet — the code is ready, but submissions will fail until
  those exist. See that section for the exact steps.
- Nobody currently reads the `ContactRequests` / `Subscribers` tables day to
  day — worth adding an email notification (e.g. via an Azure Logic App
  trigger on new table rows, or calling a transactional email API directly
  from `contact.js`) so a request doesn't just sit there until someone
  thinks to check Storage Explorer.
- All photography is deliberately absent (no stock photos, to avoid the
  generic-AI-site look) — if real photos of facilitators, sessions or
  offices become available, they'd slot naturally into the `about.html`
  team roster and the `work.html` case studies.
- Programme cohort dates in `data.js` are illustrative and will need to be
  kept current against a real delivery calendar.
