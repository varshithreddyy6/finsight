# Finsight

**Financial reports, finally understood.**

Finsight is a fully offline, browser-based equity research workbench. It ingests an archive of financial filings, builds a single searchable index on top of it, and lets you interrogate it in plain language — with every answer carrying the exact filing lines it came from.

The three companies in the shipped archive are fictional research dossiers:

* **Aurelius Systems**
* **HarborMart Retail**
* **IronPeak Energy**

Each company has five fiscal years (FY2021–FY2025) of annual filings, quarterly notes, and analyst commentary.

> **Offline by default.** The entire engine — retrieval, ratio math, and flag detection — runs locally. No API keys, no network calls, no data leaving your machine. Optional LLM providers can be connected, but the deterministic engine is the default and safe path.

---

## Table of Contents

* **What the project does**
* **How to run the project**
* **What was worked on**
* **Features**
* **Project folder structure**
* **API reference**
* **Configuration**
* **Usage examples**
* **Testing**
* **Deployment**
* **Contributing**
* **Tech stack at a glance**

---

# What the Project Does

Finsight solves a narrow but real workflow: reading financial statements the way an analyst would, but with the speed of search.

One index powers three jobs:

### 1. Ask

Type a question in plain English, such as:

* "What drove the margin change?"
* "What risks did management highlight?"

The engine retrieves the exact lines from the filings, routes the question to the right intent, and answers with click-through citations containing the file, section, and relevance score.

### 2. Measure

Finsight calculates ten core financial ratios from raw statement line items — never estimated — across five years.

The metrics include:

* Revenue Growth
* Gross Margin
* Operating Margin
* Net Margin
* ROE
* ROA
* Current Ratio
* Debt-to-Equity
* Free Cash Flow
* EPS

These can be viewed for one company or across the peer set.

### 3. Detect

A rule-based scanner reads management commentary for:

* Liquidity concerns
* Accounting/control weaknesses
* Guidance issues
* Outlook language
* Vague attribution
* Decline-with-excuse patterns

Detected issues are ranked by severity and include the triggering quote in context.

Everything above is surfaced through two frontend experiences:

### Marketing Landing Page

A complete marketing site featuring:

* Floating pill navigation
* Mega menus
* Space-themed hero
* Product blocks
* Testimonials
* FAQ
* CTA
* Deep links into specific application views

### Application

The application is an eight-view financial research workbench:

1. Ask
2. Ratios
3. Peers
4. Trends
5. Red Flags
6. Docs
7. History
8. Settings

---

# How to Run the Project

## Prerequisites

| Tool    | Version | Purpose                       |
| ------- | ------- | ----------------------------- |
| Python  | 3.10+   | FastAPI backend               |
| Node.js | 18+     | Vite development server/build |
| npm     | 9+      | Frontend dependencies         |

No database server, external API, or paid service is required.

SQLite is created automatically on first run, and the financial corpus ships with the repository.

## Step 1 — Get the Code

```bash
git clone https://github.com/varshreddyy6/finsight.git
cd finsight
```

## Step 2 — Start the Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

On Windows:

```bash
.venv\Scripts\pip install -r requirements.txt
```

Start the FastAPI server:

```bash
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Verify that it is running:

```bash
curl http://localhost:8000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "offline": true,
  "chunks": 108
}
```

The backend serves the API under `/api/*`.

It can also serve the production frontend from `frontend/dist` after a production build.

## Step 3 — Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

The landing page loads first. The application can be opened using **Launch the app**.

The Vite development server proxies `/api/*` requests to port `8000`, so no CORS configuration is required during development.

## Step 4 — Optional LLM Provider

Finsight works fully offline by default.

If you want generated answers from an LLM instead of the deterministic composer, create:

```text
frontend/.env
```

Add any supported API keys:

```env
GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=
```

Select the provider from **Settings**.

If no key is configured, or an API call fails, Finsight automatically falls back to the deterministic offline answer system.

---

# Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

This generates:

```text
frontend/dist
```

Then run the backend without `--reload`.

The backend will serve the built application at `/`.

---

# What Was Worked On

The project was developed across four major workstreams.

## 1. Offline Research Engine

### Chunking — `chunking.py`

Splits every document into section-level chunks with stable chunk IDs:

```text
source_file-index
```

This allows citations to point back to precise document locations.

### Retrieval — `retrieval.py`

Uses a TF-IDF vector index with scikit-learn and cosine similarity.

The index covers:

* Annual filings
* Quarterly notes
* Analyst notes
* User uploads

The shipped archive contains approximately 108 chunks.

### Intent Routing — `intents.py`

A transparent keyword-based router classifies questions into:

* `trend`
* `ratio`
* `risk`
* `peer`
* `red_flags`
* `general`

This allows structured financial data to be attached to narrative answers.

### Answer Composition — `llm.py`

Combines retrieved evidence with structured context to generate readable answers.

Optional providers include:

* Gemini
* Groq
* OpenRouter

The deterministic offline composer remains the default.

### Ratio Math — `ratios.py`

Calculates ten financial metrics from raw line items stored in `financials.json`.

Metrics include:

* Revenue Growth
* Gross Margin
* Operating Margin
* Net Margin
* ROE
* ROA
* Current Ratio
* Debt-to-Equity
* Free Cash Flow
* EPS

### Red-Flag Detection — `redflags.py`

Contains five explainable lexical rule categories:

1. Going-concern/liquidity
2. Accounting controls
3. Soft guidance
4. Vague attribution
5. Decline-with-excuse

Each rule produces:

* Category
* Severity score
* Triggering quote
* Context

There is no black-box classification.

### Persistence — `storage.py`

Uses SQLite to store:

* Question history
* Ingested document metadata

The database is automatically created.

---

# 2. API Service

The FastAPI backend is implemented in `main.py`.

It provides endpoints for:

* Health
* Companies
* Ratios
* Trends
* Peers
* Red Flags
* Query
* History
* Documents
* File ingestion

Supported uploaded formats:

* Markdown
* Plain Text
* PDF

PDF parsing is handled using `pypdf`.

Uploaded documents are chunked and merged into the live index, making them immediately searchable.

---

# 3. Frontend Application

The application contains eight main views:

### Ask

Search financial filings and receive cited answers.

### Ratios

View financial ratios in tables and five-year charts.

### Peers

Compare companies using:

* Absolute values
* Percentiles

### Trends

View five-year metric time series.

### Red Flags

View severity-ranked financial warning signals with supporting quotes.

### Docs

Upload and manage financial documents.

### History

View previously asked questions and answers.

### Settings

Manage:

* Theme
* LLM provider

## Shared Components

The frontend includes reusable components for:

* Top navigation bar
* Company selector
* Theme toggle
* Search bar
* Suggested prompts
* Result panels
* Click-through citations
* Charts
* Loading skeletons
* Error handling
* Footer
* View layouts

## State Management

The main `App.jsx` component manages:

* Current view
* Selected company
* Selected period
* Theme
* Search results

No external state-management library is required.

---

# 4. Landing Page & Design System

The landing page contains ten major components:

* Header
* Hero
* Logo marquee
* Product blocks
* Outcomes
* Testimonials
* Why section
* FAQ
* CTA
* Footer

The landing page also includes mega-menu navigation and deep links into specific application views.

## Motion

Animations use `framer-motion`, including:

* Staggered hero entrances
* Scroll-triggered reveals
* Mega-menu animations
* Card hover effects

## Design System

The application uses hand-written CSS.

No CSS framework is used.

Main design characteristics:

* Dark canvas: `#000` / `#141416`
* Lemon accent: `#F2F536`
* Display font: Instrument Serif
* UI font: Inter
* 4px / 8pt spacing scale
* Pill-shaped controls

The landing page and application share the same design tokens and visual language.

---

# Features

| Feature                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| Ask with citations     | Ask plain-English questions and receive answers backed by filing evidence |
| Ten ratios             | Calculate ten financial metrics across five years                         |
| Peer comparison        | Compare companies using absolute values or percentiles                    |
| Trend charts           | View five-year financial metric trends                                    |
| Red-flag scanner       | Detect financial warning language using explainable rules                 |
| Bring your own filings | Upload Markdown, TXT, or PDF documents                                    |
| Question history       | Persist and manage previous questions                                     |
| Document management    | List, inspect, and delete ingested documents                              |
| Offline-first          | Core functionality works without internet                                 |
| Optional LLM answers   | Gemini, Groq, and OpenRouter support                                      |
| Landing page           | Complete marketing website                                                |
| Dark/light themes      | Toggle between themes                                                     |
| SPA-friendly serving   | Backend can serve the built frontend                                      |

---

# Project Folder Structure

```text
finsight/
├── README.md
├── DEPLOYMENT.md
├── run.sh
├── smoke_test.py
├── .env.example
├── .gitignore
│
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── chunking.py
│       ├── retrieval.py
│       ├── intents.py
│       ├── llm.py
│       ├── ratios.py
│       ├── redflags.py
│       └── storage.py
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── lib/
│       │   └── api.js
│       ├── assets/
│       ├── components/
│       ├── views/
│       ├── landing/
│       └── styles/
│           └── landing.css
│
└── data/
    ├── financials.json
    ├── filings/
    │   └── <company>/
    ├── quarterly/
    │   └── <company>/
    ├── analyst_notes/
    │   └── <company>/
    ├── scripts/
    │   └── gen_corpus.py
    └── finsight.sqlite
```

---

# Where Things Live

### Corpus

```text
data/
```

Contains:

* Markdown financial documents
* `financials.json`

### Engine

```text
backend/app/
```

Contains the backend modules.

### Product

```text
frontend/src/
```

Contains the user-facing application.

```text
frontend/src/landing/
```

Contains the marketing site.

```text
frontend/src/views/
```

Contains the workbench views.

---

# API Reference

Development base URL:

```text
http://localhost:8000
```

Through the Vite proxy:

```text
/api/...
```

## Endpoints

| Method | Path                                | Description                                 |
| ------ | ----------------------------------- | ------------------------------------------- |
| GET    | `/api/health`                       | Service status and indexed chunk count      |
| GET    | `/api/companies`                    | Company IDs, names, and available periods   |
| POST   | `/api/query`                        | Answer a question with intent and citations |
| GET    | `/api/ratios?company=&period=`      | All ten ratios for a company and period     |
| GET    | `/api/trends?company=&metric=`      | Five-year metric series                     |
| GET    | `/api/peers?company=&metric=&mode=` | Peer comparison                             |
| GET    | `/api/redflags?company=`            | Severity-ranked red flags                   |
| GET    | `/api/history`                      | Last 100 questions                          |
| DELETE | `/api/history/{id}`                 | Delete one history item                     |
| DELETE | `/api/history`                      | Clear all history                           |
| GET    | `/api/documents`                    | List ingested documents                     |
| DELETE | `/api/documents/{filename}`         | Delete an ingested document                 |
| POST   | `/api/ingest`                       | Upload `.md`, `.txt`, or `.pdf`             |

For peer comparison:

```text
mode=absolute
```

or:

```text
mode=percentile
```

---

# POST /api/query

Example request:

```json
{
  "question": "What risks did management highlight?",
  "company": "harbormart",
  "period": "FY2025"
}
```

Example response:

```json
{
  "answer": "Management's FY2025 commentary flags liquidity language: the company cites …",
  "intent": "risk",
  "company": "harbormart",
  "period": "FY2025",
  "citations": [
    {
      "source_file": "quarterly/harbormart/Q4_FY2025.md",
      "section": "Liquidity",
      "chunk_id": "quarterly/harbormart/Q4_FY2025.md-3",
      "score": 0.41
    }
  ],
  "follow_ups": [
    "Show the major red flags",
    "Compare leverage with peers"
  ]
}
```

---

# Configuration

There is very little configuration by design.

| Variable             | Required | Purpose            |
| -------------------- | -------- | ------------------ |
| `GEMINI_API_KEY`     | No       | Enables Gemini     |
| `GROQ_API_KEY`       | No       | Enables Groq       |
| `OPENROUTER_API_KEY` | No       | Enables OpenRouter |

Everything else is file-based.

The corpus is stored under:

```text
data/
```

The SQLite database is:

```text
finsight.sqlite
```

Deleting the SQLite database resets:

* Question history
* Document metadata

The original filings remain untouched.

---

# Frontend Development Configuration

In `vite.config.js`:

```text
/api → http://localhost:8000
```

The Vite development server forwards API requests to the FastAPI backend.

Preview hosts allow:

```text
.e2b.app
```

Development responses use `no-store` so that stale modules are not cached.

---

# Usage Examples

## Health Check

```bash
curl http://localhost:8000/api/health
```

## Ratios

```bash
curl "http://localhost:8000/api/ratios?company=harbormart&period=FY2025"
```

## Five-Year Operating Margin Trend

```bash
curl "http://localhost:8000/api/trends?company=aurelius&metric=operating_margin"
```

## Peer Comparison

```bash
curl "http://localhost:8000/api/peers?company=ironpeak&metric=debt_to_equity&mode=percentile"
```

## Red Flags

```bash
curl "http://localhost:8000/api/redflags?company=harbormart"
```

## Ask a Question

```bash
curl -X POST http://localhost:8000/api/query \
  -H 'Content-Type: application/json' \
  -d '{"question":"How has debt-to-equity changed?","company":"aurelius","period":"FY2025"}'
```

## Upload a Filing

```bash
curl -X POST http://localhost:8000/api/ingest \
  -F "file=@/path/to/my_filing.md"
```

---

# Using the UI

1. Open the application.
2. Select a company from the top navigation.
3. Select the required view.
4. Start with a suggested prompt or type your own question.
5. Review the answer.
6. Click the citations to inspect the underlying evidence.

---

# Testing

Run:

```bash
python smoke_test.py
```

The smoke test:

* Builds the index from `data/`
* Runs five representative questions
* Tests retrieval
* Tests intent routing
* Tests red-flag detection
* Confirms HarborMart triggers the expected red flags
* Confirms Aurelius remains clean

It runs without starting the server.

Expected output:

```text
Smoke test: PASS
```

---

# Deployment

## Vercel / Netlify

Build the frontend:

```bash
npm run build
```

Output:

```text
dist
```

Point the API base URL to the hosted backend.

## Render / PaaS

Root directory:

```text
backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

After a production frontend build, the backend can also serve the frontend, allowing the entire application to run as a single service.

### Important Caveat

SQLite and uploaded documents are stored on local disk.

On ephemeral free-tier hosting platforms, durable storage should be configured before accepting important user documents.

---

# Contributing

The codebase is intentionally small and dependency-light.

## Add a Company

Add its:

* Filings
* Quarterly notes
* Analyst notes

under:

```text
data/
```

Then add its financial line items to:

```text
financials.json
```

Restart the backend so the index can rebuild.

## Add a Ratio

Extend:

```text
calc()
```

in:

```text
ratios.py
```

Then surface the metric in:

```text
views/Ratios.jsx
```

and the trend metric list.

## Add a Red-Flag Rule

Add a rule to the `rules` list in:

```text
redflags.py
```

Each rule should contain:

* Category
* Regex
* Severity
* Score

Keep the rule explainable and readable by a human reviewer.

## Add an Intent

Extend:

```text
route()
```

in:

```text
intents.py
```

Then add its structured context in:

```text
main.py
```

## Frontend Conventions

Use:

* Hand-written CSS
* Existing design tokens
* Existing spacing scale
* Existing radii
* Existing easing

New motion should use `framer-motion` with the shared easing:

```text
cubic-bezier(.22, 1, .36, 1)
```

Before pushing:

```bash
python smoke_test.py
```

For UI changes, include a screenshot in the pull request.

---

# Tech Stack at a Glance

| Layer               | Technology                                   |
| ------------------- | -------------------------------------------- |
| Frontend framework  | React 18                                     |
| Build tool          | Vite 8                                       |
| Motion              | framer-motion                                |
| Charts              | recharts                                     |
| Styling             | Hand-written CSS design system               |
| API                 | FastAPI + Uvicorn                            |
| Retrieval           | scikit-learn TF-IDF + cosine similarity      |
| Optional generation | Gemini / Groq / OpenRouter                   |
| Document parsing    | pypdf                                        |
| Persistence         | SQLite                                       |
| Corpus              | Markdown filings + JSON financial line items |

---

# Designed & Built By

**Varshith Reddy**

GitHub: [https://github.com/varshreddyy6/finsight](https://github.com/varshreddyy6/finsight)

**Finsight runs entirely on your machine. Nothing you upload leaves it.**
