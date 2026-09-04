# finsight

> **Editorial intelligence for financial research.**

**finsight** is an offline-first financial research application that combines evidence retrieval with deterministic financial analytics.

It helps users understand annual reports, quarterly commentary, analyst notes, and uploaded documents without requiring an API key or paid cloud service.

Users can ask financial questions, inspect source excerpts, calculate financial ratios, explore five-year trends, compare companies, review management risks, identify explainable red flags, upload documents, and revisit previous research queries.

**Designed & built by Varshith Reddy**

* **Email:** [varshithreddyy6@gmail.com](mailto:varshithreddyy6@gmail.com)
* **LinkedIn:** [linkedin.com/in/varshithreddyvangeti](https://linkedin.com/in/varshithreddyvangeti)
* **GitHub:** [github.com/varshreddyy6](https://github.com/varshreddyy6)

---

## Screenshots

> Add product screenshots here.

---

## Overview

Financial reports contain large amounts of useful information, but finding the right evidence and turning it into comparable financial insight can be time-consuming.

finsight provides a focused workflow:

```text
Ask
 ↓
Understand
 ↓
Verify
 ↓
Explore
 ↓
Ask the next question
```

Instead of treating financial research as a generic chatbot problem, the application separates the work into two complementary systems:

1. **Deterministic financial analytics** for questions that can be answered directly from structured financial data.
2. **Evidence retrieval** for questions that depend on management commentary, risk disclosures, analyst notes, and other document content.

The guiding principle is:

> **Evidence first. Computation second. Language third.**

The application is designed to remain useful without an external AI provider. Optional language-model providers can enhance answer generation, but the local deterministic engine remains the fallback.

---

## Implementation Status

The repository currently contains a working offline-first MVP with a React/Vite frontend and FastAPI backend.

### Implemented and smoke-tested

The following functionality has been implemented and exercised through the project's verification workflow:

* deterministic corpus generation
* TF-IDF document retrieval
* cosine similarity ranking
* company-filtered evidence retrieval
* deterministic intent routing
* financial ratio calculations
* five-year trend analytics
* peer comparisons
* explainable red-flag detection
* financial query API
* frontend production build

### Implemented in the backend

The backend includes:

* SQLite query history
* document metadata persistence
* TXT ingestion
* Markdown ingestion
* PDF ingestion with `pypdf`
* upload validation
* filename sanitization
* path traversal protection
* document deletion
* FastAPI static-file serving
* React SPA fallback support

### Implemented in the frontend

The frontend includes:

* Ask view
* Ratios view
* Peers view
* Trends view
* Flags view
* Documents view
* History view
* Settings view
* dark/light themes
* responsive layouts
* Recharts trend visualizations
* loading states
* error states
* reduced-motion support
* keyboard-friendly controls

### Remaining limitations

The following areas are not yet fully implemented:

* live Gemini HTTP adapter
* live Groq HTTP adapter
* live OpenRouter HTTP adapter
* rich citation popover/dialog interactions
* drag-and-drop document upload UI
* complete persistent document-management interface
* comprehensive automated test suite

The following areas are environment-dependent and have not been fully verified:

* live third-party provider calls
* browser-based accessibility tooling
* deployed hosting
* production deployment persistence

This README intentionally distinguishes implemented capabilities from features that still require additional production hardening.

---

## What Was Worked On

The project was developed as a full-stack financial research system rather than as a frontend-only dashboard.

### 1. Financial data foundation

A structured dataset was established as the single source of truth:

```text
data/financials.json
```

The dataset contains financial history for three fictional companies from:

```text
FY2021 → FY2025
```

This data feeds the financial calculations, generated reports, trend analytics, peer comparisons, and downstream API responses.

### 2. Deterministic corpus generation

A corpus-generation script creates realistic financial research documents from the structured financial data.

The generated corpus includes:

* annual reports
* quarterly reports
* analyst notes

This avoids maintaining separate hand-written financial numbers across the project.

### 3. Retrieval engine

A local retrieval pipeline was implemented using:

* semantic document chunking
* TF-IDF vectorization
* cosine similarity
* metadata filtering
* evidence extraction
* ranked retrieval

This allows the application to answer document-oriented questions without requiring a hosted vector database.

### 4. Intent routing

Questions are classified deterministically into:

```text
trend
ratio
risk
peer
red_flags
general
```

This allows structured questions to use financial calculations rather than unnecessarily passing them through a language model.

### 5. Financial analytics

The backend calculates key financial metrics including:

* revenue growth
* gross margin
* operating margin
* net margin
* ROE
* ROA
* current ratio
* debt-to-equity
* free cash flow
* EPS

Historical values and year-over-year changes can also be derived from the underlying dataset.

### 6. Trend analysis

Five-year analytical series are available for:

* revenue
* revenue growth
* gross margin
* operating margin
* net margin
* ROE
* ROA
* free cash flow
* EPS
* debt-to-equity

The frontend renders these values through Recharts.

### 7. Peer analytics

The backend compares the seeded companies using:

* revenue growth
* operating margin
* net margin
* ROE
* debt-to-equity
* free cash flow

Comparison modes include:

```text
absolute
percentile
```

### 8. Explainable red-flag detection

A rule-based red-flag engine was developed using:

* regular expressions
* phrase matching
* lexical rules
* contextual heuristics
* quantification logic

The system looks for patterns such as:

* liquidity concerns
* going-concern language
* accounting control weaknesses
* soft guidance
* vague attribution
* decline-with-excuse language

The detector returns the evidence behind each result rather than simply displaying an unexplained score.

### 9. Document ingestion

The backend supports:

```text
.txt
.md
.pdf
```

Uploaded documents are:

```text
Validated
   ↓
Sanitized
   ↓
Stored
   ↓
Parsed
   ↓
Chunked
   ↓
Indexed
   ↓
Made searchable
```

Uploaded data is stored locally under:

```text
data/uploads/
```

### 10. Persistence

SQLite was introduced for local persistence of:

* query history
* document metadata

This allows research history and document records to survive backend restarts in local development.

### 11. React research interface

The frontend was designed as an editorial financial research product rather than a conventional SaaS dashboard.

The interface includes:

* research-oriented navigation
* company and period controls
* analytical views
* evidence panels
* financial charts
* source metadata
* historical research
* settings
* responsive layouts

### 12. Visual system

The interface follows a restrained editorial design language featuring:

* near-black dark mode
* warm paper-inspired light mode
* amber identity color
* oversized serif display typography
* Inter for interface text
* generous whitespace
* subtle borders
* data storytelling
* restrained animation

The goal is to create a feeling of:

> **premium financial research software rather than a generic dashboard or chatbot.**

---

## Features

### Offline financial question answering

Users can ask questions such as:

```text
How has operating margin trended over 5 years?
```

```text
What risks did management highlight this quarter?
```

```text
How does HarborMart compare with its peers?
```

```text
What red flags were detected?
```

```text
How has debt-to-equity changed?
```

The application can answer these questions through deterministic local analysis and retrieval.

---

### Three seeded companies

The project includes exactly three fictional companies.

| Company               | Profile                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------- |
| **Aurelius Systems**  | Healthy growth company with improving margins, strong liquidity, and good cash generation |
| **HarborMart Retail** | Declining retailer with liquidity, guidance, covenant, and internal-control concerns      |
| **IronPeak Energy**   | Leveraged cyclical company with fluctuating earnings and meaningful debt                  |

Each company contains:

```text
FY2021
FY2022
FY2023
FY2024
FY2025
```

The corpus also includes FY2025 quarterly reporting and one analyst note per company.

---

### Evidence-backed citations

Retrieved evidence retains metadata including:

* company
* fiscal year
* quarter
* document type
* section
* source filename
* chunk ID
* retrieval score
* exact excerpt

The purpose is to allow users to trace an answer back to its source rather than accepting unsupported chatbot output.

---

### Financial ratio analysis

The backend calculates:

| Metric           | Description                                    |
| ---------------- | ---------------------------------------------- |
| Revenue growth   | Year-over-year revenue change                  |
| Gross margin     | Gross profit as a percentage of revenue        |
| Operating margin | Operating income as a percentage of revenue    |
| Net margin       | Net income as a percentage of revenue          |
| ROE              | Return on equity                               |
| ROA              | Return on assets                               |
| Current ratio    | Current assets relative to current liabilities |
| Debt-to-equity   | Debt relative to shareholder equity            |
| Free cash flow   | Operating cash flow less capital expenditure   |
| EPS              | Earnings per share                             |

The implementation safely handles:

* missing values
* null values
* zero denominators
* unavailable metrics
* unusual negative-equity situations

---

### Five-year trends

Trend analysis is available for:

```text
Revenue
Revenue growth
Gross margin
Operating margin
Net margin
ROE
ROA
Free cash flow
EPS
Debt-to-equity
```

The standard historical range is:

```text
FY2021 → FY2025
```

---

### Peer comparisons

Peer comparison is calculated in the backend rather than in React.

Supported metrics include:

* revenue growth
* operating margin
* net margin
* ROE
* debt-to-equity
* free cash flow

Comparison modes:

```text
absolute
percentile
```

The frontend presents comparisons as a visual ranking story with the selected company emphasized.

---

### Explainable red flags

The red-flag engine analyzes source text for potentially concerning management language.

Categories include:

1. Going-concern and liquidity concerns
2. Accounting controls
3. Soft guidance
4. Vague attribution
5. Decline-with-excuse language

Each detected issue contains:

```text
category
severity
score
quote
explanation
source
metadata
```

The result is designed to be explainable rather than a black-box risk score.

The seeded corpus is designed so that:

```text
HarborMart Retail → multiple detected concerns
Aurelius Systems → minimal or no concerning flags
```

Acceptance criteria for the detector are:

```text
HarborMart Retail >= 6 flags
Aurelius Systems <= 1 flag
```

Actual observed counts should be obtained by running the detector rather than assuming a fixed value.

---

### Document ingestion

Supported formats:

```text
TXT
Markdown
PDF
```

PDF documents are parsed locally with `pypdf`.

Uploaded files go through validation before becoming searchable.

The upload system includes protections against:

* unsupported extensions
* empty files
* path traversal
* unsafe filenames
* oversized uploads
* corrupt PDFs

The default development upload limit is 10 MB.

---

### Persistent research history

Research history is stored in SQLite.

Stored information includes:

* question
* timestamp
* company
* period
* intent
* answer summary
* full answer

The application supports listing and deleting saved research entries.

---

### Document metadata

Document metadata can include:

* filename
* source type
* company/source label
* period
* upload date
* section count
* indexed status

---

### Editorial research interface

The frontend contains:

* Ask
* Ratios
* Peers
* Trends
* Flags
* Docs
* History
* Settings

The design uses a research-oriented editorial composition rather than chat bubbles or a conventional admin dashboard.

---

### Dark and light themes

The product supports both:

#### Dark theme

Near-black background, warm ivory text, restrained amber, subtle borders, and muted surfaces.

#### Light theme

Warm paper-inspired background, white content surfaces, dark typography, and a deeper amber accent.

Both themes are intended to remain readable and visually balanced.

---

### Responsive design

The interface is designed for:

```text
360px → 1440px+
```

Responsive behavior includes:

* stacked content
* adaptable typography
* responsive charts
* horizontally scrollable data tables
* mobile-friendly query input
* compact mobile navigation
* responsive evidence panels

---

### Loading and error states

The interface avoids relying on blank screens during API requests.

Loading states use skeleton-style placeholders where appropriate.

Error states are written in product-oriented language and provide recovery actions.

---

## Technology Stack

### Frontend

* React 18
* Vite
* Recharts
* Framer Motion
* JavaScript
* JSX
* CSS custom properties

Typography:

* Inter
* Instrument Serif

### Backend

* Python 3.11+
* FastAPI
* Uvicorn
* Pydantic
* scikit-learn
* NumPy
* pypdf
* python-multipart

### Persistence

* JSON for structured financial source data
* Markdown/text for generated corpus documents
* SQLite for local history and document metadata
* local filesystem storage for uploads

### Retrieval

```text
TF-IDF
+
Cosine similarity
+
Semantic chunking
+
Metadata filtering
```

No external vector database is required.

---

## Architecture

```text
                         ┌─────────────────────────┐
                         │   data/financials.json  │
                         │    Source of truth      │
                         └────────────┬────────────┘
                                      │
                              Corpus generator
                                      │
                  ┌───────────────────┴───────────────────┐
                  │                                       │
          Generated documents                       Structured data
                  │                                       │
             Chunking                                  Ratios
                  │                                       │
             TF-IDF index                              Trends
                  │                                       │
             Retrieval                                 Peers
                  │                                       │
                  └───────────────────┬───────────────────┘
                                      │
                                  FastAPI
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
           Query                   Analytics                 Storage
             │                        │                        │
             │               ┌────────┼────────┐              │
             │               │        │        │              │
             │             Ratios   Trends   Peers         SQLite
             │                                                │
             └──────────────────────┬─────────────────────────┘
                                    │
                                  React
                                    │
          ┌──────────┬──────────┬──────────┬──────────┬──────────┐
          │          │          │          │          │          │
         Ask       Ratios     Peers     Trends     Flags       Docs
          │
       History
          │
       Settings
```

---

## Data flow

Structured financial information flows through the application as follows:

```text
data/financials.json
        ↓
data/scripts/gen_corpus.py
        ↓
generated filings / quarterly reports / analyst notes
        ↓
semantic chunking
        ↓
TF-IDF indexing
        ↓
retrieval
        ↓
FastAPI analysis layer
        ↓
React interface
```

Financial calculations use the same structured source:

```text
financials.json
        ↓
ratio engine
        ↓
trend engine
        ↓
peer engine
        ↓
API
        ↓
frontend
```

This minimizes the risk of conflicting numbers across the application.

---

## Project Folder Structure

```text
finsight/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── intents.py
│       ├── retrieval.py
│       ├── llm.py
│       ├── ratios.py
│       ├── redflags.py
│       ├── chunking.py
│       └── storage.py
│
├── data/
│   ├── financials.json
│   ├── scripts/
│   │   └── gen_corpus.py
│   ├── filings/
│   │   ├── aurelius/
│   │   ├── harbormart/
│   │   └── ironpeak/
│   ├── quarterly/
│   │   ├── aurelius/
│   │   ├── harbormart/
│   │   └── ironpeak/
│   ├── analyst_notes/
│   │   ├── aurelius/
│   │   ├── harbormart/
│   │   └── ironpeak/
│   └── uploads/
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── lib/
│       │   └── api.js
│       └── components/
│           ├── TopBar.jsx
│           ├── SideNav.jsx
│           ├── AskView.jsx
│           ├── AnswerCard.jsx
│           ├── CitationChips.jsx
│           ├── SuggestedPills.jsx
│           ├── RatiosView.jsx
│           ├── PeersView.jsx
│           ├── TrendsView.jsx
│           ├── FlagsView.jsx
│           └── DocsView.jsx
│
├── smoke_test.py
├── run.sh
├── .env.example
├── README.md
└── DEPLOYMENT.md
```

### Backend responsibilities

#### `main.py`

FastAPI application, API routes, validation, ingestion, and production static serving.

#### `intents.py`

Deterministic classification of user questions.

#### `retrieval.py`

Corpus discovery, indexing, TF-IDF retrieval, ranking, filtering, and evidence selection.

#### `llm.py`

Answer-generation abstraction and offline fallback logic.

#### `ratios.py`

Financial metric formulas and historical calculations.

#### `redflags.py`

Explainable management-language detection.

#### `chunking.py`

Semantic section-based document segmentation.

#### `storage.py`

SQLite persistence for history and document metadata.

---

### Data responsibilities

#### `financials.json`

The authoritative structured financial dataset.

#### `gen_corpus.py`

Regenerates the demo corpus from `financials.json`.

#### `filings/`

Generated annual financial reports.

#### `quarterly/`

FY2025 quarterly reports.

#### `analyst_notes/`

One analyst note per seeded company.

#### `uploads/`

User-provided TXT, Markdown, and PDF files.

---

### Frontend responsibilities

#### `App.jsx`

Application shell, view switching, and major shared state.

#### `index.css`

Design tokens, themes, responsive rules, typography, and global styling.

#### `lib/api.js`

Centralized API client.

#### `components/`

Reusable UI components for research views and interface elements.

---

## Prerequisites

Install:

* Python 3.11 or newer
* Node.js 18 or newer
* npm
* Git

Verify installations:

```bash
python --version
node --version
npm --version
```

On Windows, `py` can be used instead of `python` when required.

---

## Running the Project

### 1. Generate the corpus

From the project root:

```bash
python data/scripts/gen_corpus.py
```

Windows PowerShell:

```powershell
python data\scripts\gen_corpus.py
```

This regenerates the demo documents from `data/financials.json`.

---

### 2. Set up the backend

```bash
cd backend
python -m venv .venv
```

Activate the environment.

#### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

#### macOS/Linux

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

The backend normally runs at:

```text
http://localhost:8000
```

---

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

The Vite development server proxies `/api/*` requests to the FastAPI backend.

---

## Windows Quick Start

From the project root:

```powershell
python data\scripts\gen_corpus.py
```

Create the backend environment:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/health
```

If PowerShell prevents virtual-environment activation, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate the environment again.

---

## macOS/Linux Quick Start

Generate the corpus:

```bash
python3 data/scripts/gen_corpus.py
```

Set up the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Standard Development Workflow

Use two terminals.

### Terminal 1 — FastAPI

```bash
cd backend
```

Activate the virtual environment, then:

```bash
python -m uvicorn app.main:app --reload
```

### Terminal 2 — Vite

```bash
cd frontend
npm run dev
```

Keep both processes running during local development.

---

## Usage

1. Open `http://localhost:5173`.
2. Select one of the three seeded companies.
3. Choose the relevant period.
4. Enter a financial question or select a suggested prompt.
5. Review the generated answer.
6. Inspect charts and financial metrics.
7. Open citations and source excerpts where available.
8. Explore Ratios, Peers, Trends, and Flags.
9. Upload a TXT, Markdown, or PDF document when additional evidence is required.
10. Review previous research in History.

### Example questions

```text
How has operating margin trended over 5 years?
```

```text
What risks did management highlight this quarter?
```

```text
How does HarborMart compare with its peers?
```

```text
What red flags were detected?
```

```text
How has debt-to-equity changed?
```

---

## API Overview

The application exposes its functionality through FastAPI under `/api`.

| Method   | Endpoint                    | Purpose                               |
| -------- | --------------------------- | ------------------------------------- |
| `GET`    | `/api/health`               | Backend availability and index status |
| `GET`    | `/api/companies`            | Available companies and periods       |
| `POST`   | `/api/query`                | Run a financial research query        |
| `GET`    | `/api/ratios`               | Calculate financial ratios            |
| `GET`    | `/api/trends`               | Return historical trend data          |
| `GET`    | `/api/peers`                | Compare companies                     |
| `GET`    | `/api/redflags`             | Detect management red flags           |
| `GET`    | `/api/documents`            | List document metadata                |
| `POST`   | `/api/ingest`               | Upload and index a document           |
| `DELETE` | `/api/documents/{filename}` | Delete an uploaded document           |
| `GET`    | `/api/history`              | List saved research queries           |
| `DELETE` | `/api/history/{id}`         | Delete one history item               |
| `DELETE` | `/api/history`              | Clear research history                |

---

## Query Example

### Request

```json
{
  "question": "How has operating margin trended over 5 years?",
  "company": "aurelius",
  "period": "FY2025"
}
```

### Typical response structure

```json
{
  "answer": "Operating margin expanded over the five-year period...",
  "intent": "trend",
  "company": {},
  "period": "FY2025",
  "citations": [],
  "evidence": [],
  "metrics": {},
  "chart": {},
  "red_flags": [],
  "follow_ups": [],
  "retrieval": {}
}
```

The exact fields returned depend on the query and the current API implementation.

---

## Query Flow

Structured questions follow a deterministic workflow:

```text
User question
      ↓
Intent routing
      ↓
Metric extraction
      ↓
Financial dataset
      ↓
Ratio / trend / peer engine
      ↓
Computed result
      ↓
Research prose
      ↓
Evidence and citations
```

General document-oriented questions use:

```text
User question
      ↓
TF-IDF retrieval
      ↓
Cosine similarity
      ↓
Evidence ranking
      ↓
Relevant passages
      ↓
Deterministic synthesis
      ↓
Citations
```

This separation helps prevent unnecessary hallucination and keeps financial computations reproducible.

---

## Retrieval Architecture

The retrieval layer is designed around an abstraction similar to:

```python
retrieve(query, filters=None, top_k=5)
```

The current implementation uses:

* document discovery
* normalization
* semantic chunking
* TF-IDF vectorization
* cosine similarity
* metadata filtering
* ranked retrieval
* evidence extraction

The design leaves room for a future replacement with systems such as:

* sentence-transformers
* FAISS
* another vector index

without requiring a redesign of the frontend or API contract.

---

## Corpus Generation

Run:

```bash
python data/scripts/gen_corpus.py
```

The generator creates:

```text
data/
├── financials.json
├── filings/
├── quarterly/
├── analyst_notes/
└── uploads/
```

The generated documents contain sections such as:

* Executive Summary
* Revenue
* Gross Profit
* Operating Income
* Net Income
* Cash Flow
* Balance Sheet
* Liquidity
* Debt
* Capital Allocation
* Outlook
* Risk Factors
* Management Discussion & Analysis
* Internal Controls

Quarterly reports and analyst notes use corresponding research-oriented sections.

---

## Red-Flag Detection

The red-flag engine focuses on explainable language patterns.

Examples include statements referring to:

* liquidity pressure
* substantial doubt about continuation
* covenant waivers
* internal control weaknesses
* non-quantitative guidance
* vague market explanations
* declining performance attributed primarily to broad conditions

The engine retains the supporting source excerpt and metadata so users can inspect the underlying evidence.

Acceptance thresholds:

```text
HarborMart Retail >= 6 flags
Aurelius Systems <= 1 flag
```

The actual count should always be determined from the current generated corpus and detector implementation.

---

## Document Upload Security

Uploaded files are:

* restricted to supported extensions
* checked for empty content
* checked against the file-size limit
* written using sanitized filenames
* stored only below `data/uploads/`
* never executed
* parsed locally

The implementation should not expose arbitrary filesystem locations through the upload API.

---

## Optional AI Providers

The product philosophy is offline-first.

Optional environment variables are:

```text
GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=
```

The intended provider sequence is:

```text
Gemini
   ↓
Groq
   ↓
OpenRouter
   ↓
Offline fallback
```

Provider failures should not make the product unusable.

When no API key is configured, finsight must continue operating through its local deterministic engine.

> **finsight runs fully offline without any API key. API keys only upgrade answer generation and are never required for the demo.**

Never commit real API credentials to the repository.

---

## Persistence

The application uses SQLite for local persistence.

The database stores:

* research history
* document metadata

Uploaded documents themselves remain on the local filesystem:

```text
data/uploads/
```

This architecture is intentionally simple and suitable for local development.

For hosted production deployments, durable database and file storage should be evaluated separately.

---

## Design System

The interface uses a dark/light editorial visual system.

### Dark theme

```css
--background: #0A0A0B;
--surface: #141416;
--border: rgba(255,255,255,0.06);

--accent: #F5A623;
--positive: #34D399;
--negative: #F87171;

--text-primary: #F4F1EA;
--text-secondary: rgba(244,241,234,0.62);
--text-muted: rgba(244,241,234,0.38);
```

### Light theme

```css
--background: #F4F1EA;
--surface: #FFFFFF;
--surface-raised: #FAF8F3;

--border: rgba(20,20,22,0.09);

--accent: #B96E00;
--positive: #14805A;
--negative: #C84B45;

--text-primary: #171719;
--text-secondary: rgba(23,23,25,0.66);
--text-muted: rgba(23,23,25,0.44);
```

### Typography

**Inter** is used for:

* navigation
* UI
* body text
* labels
* metadata
* tables

**Instrument Serif** is used for:

* hero headlines
* large analytical headings
* major financial moments
* the finsight wordmark

Financial figures use tabular numerals for easier comparison.

---

## Responsive Design

The frontend is designed to work across:

```text
360px
390px
430px
768px
1024px
1280px
1440px+
```

Mobile behavior includes:

* compact header
* mobile navigation
* stacked analytical sections
* full-width query input
* horizontally scrollable tables
* responsive charts
* preserved editorial spacing
* touch-friendly interactions

The application should not require horizontal page scrolling.

---

## Accessibility

Accessibility is treated as a core product consideration.

The UI includes or targets:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible controls
* reasonable touch targets
* readable contrast
* reduced-motion support
* accessible tabular representations of chart data
* non-color-only financial state indicators

Browser-based accessibility tooling has not been fully verified in every environment, so deployment teams should perform their own accessibility audit before production release.

---

## Development Checks

### Corpus generation

```bash
python data/scripts/gen_corpus.py
```

### Backend installation

```bash
cd backend
python -m pip install -r requirements.txt
```

### Backend startup

```bash
python -m uvicorn app.main:app --reload
```

### Frontend installation

```bash
cd frontend
npm install
```

### Frontend development server

```bash
npm run dev
```

### Production frontend build

```bash
cd frontend
npm run build
```

### Smoke test

From the project root:

```bash
python smoke_test.py
```

On Windows, when necessary:

```powershell
.\backend\.venv\Scripts\python.exe smoke_test.py
```

---

## Smoke Test

The smoke test exercises real application functionality rather than checking only the health endpoint.

It verifies areas including:

* corpus availability
* retrieval initialization
* representative financial queries
* intent routing
* evidence retrieval
* red-flag detection
* company-specific behavior
* offline analysis

The required sample questions include:

```text
How has operating margin trended over 5 years?
What risks did management highlight this quarter?
How does HarborMart compare with its peers?
What red flags were detected?
How has debt-to-equity changed?
```

The smoke test should exit with a non-zero status when a required check fails.

---

## Production Serving

The project supports a production architecture in which FastAPI serves the compiled React application:

```text
FastAPI
├── /api/*
└── frontend/dist/*
```

Build the frontend:

```bash
cd frontend
npm run build
```

Start FastAPI:

```bash
cd ../backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Then open:

```text
http://localhost:8000
```

API routes remain available under:

```text
http://localhost:8000/api/...
```

The application should provide SPA fallback behavior so client-side frontend routes continue to work after refresh.

---

## Environment Variables

Create a local `.env` file when optional provider credentials are needed.

Example:

```text
GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=
```

All provider credentials are optional.

Do not commit `.env` to source control.

The repository should include:

```text
.env.example
```

with empty values.

---

## Deployment

Detailed deployment information belongs in:

```text
DEPLOYMENT.md
```

The project can be adapted to frontend and backend hosting platforms such as:

* Vercel
* Netlify
* Render
* Railway

However, deployment environments must be evaluated carefully for:

* cold starts
* persistent SQLite storage
* uploaded-file persistence
* filesystem durability
* environment variables
* CORS
* backend availability

Free hosting platforms may use ephemeral filesystems. Local SQLite databases and uploaded documents may therefore not survive redeployments or instance replacement.

For durable production workloads, a persistent database and durable file/object storage may eventually be required.

---

## Security Considerations

The project intentionally uses local data and does not require authentication for the demo.

Important security practices include:

* keep provider secrets in environment variables
* never commit real API keys
* sanitize uploaded filenames
* prevent path traversal
* allowlist document extensions
* enforce reasonable upload limits
* never execute uploaded documents
* avoid exposing arbitrary filesystem paths
* use restrictive production CORS settings
* avoid returning internal stack traces from API errors

---

## Contributing

Contributions should preserve the architecture and data-consistency principles of the project.

1. Fork the repository.
2. Create a focused branch.
3. Keep financial source values in `data/financials.json`.
4. Regenerate the corpus after changing structured data.
5. Keep financial calculations in the backend.
6. Preserve evidence metadata when changing retrieval.
7. Run the smoke test.
8. Run the frontend production build.
9. Describe relevant verification in the pull request.

Examples of useful improvements include:

* stronger metric extraction
* better PDF parsing
* more robust evidence ranking
* broader automated tests
* accessibility improvements
* richer source interactions

---

## Current Limitations

The current project is intentionally positioned as a portfolio-grade offline-first MVP rather than a large-scale production financial platform.

Known limitations include:

* seeded financial data is fictional
* offline answer generation is deterministic rather than equivalent to a general-purpose LLM
* PDF extraction is text-oriented and may not perfectly reconstruct complex tables
* live Gemini/Groq/OpenRouter adapters may not be fully implemented
* rich citation dialogs may require further UI work
* document management may remain lighter than a full enterprise archive
* local SQLite and filesystem storage are not universally durable in hosted environments
* comprehensive browser-based accessibility testing should be performed before production deployment

The project is for software demonstration and educational purposes.

It is not financial, accounting, legal, or investment advice.

---

## Credits

**Designed & built by Varshith Reddy**

* [Email](mailto:varshithreddyy6@gmail.com)
* [LinkedIn](https://linkedin.com/in/varshithreddyvangeti)
* [GitHub](https://github.com/varshreddyy6)

```text
finsight © 2026
```

---

## Project Philosophy

finsight is built around a simple research model:

```text
Evidence
   ↓
Computation
   ↓
Explanation
   ↓
Exploration
```

The goal is not to replace financial judgment.

The goal is to make the underlying information:

* easier to search
* easier to compare
* easier to verify
* easier to understand

> **finsight — editorial intelligence for financial research.**
