# Re-model

A home renovation investment platform that helps users identify high-potential properties, plan financing, execute renovations, and track profitability from purchase to exit.

## Current MVP Starter (Implemented)
This repository now includes a React + Vite MVP starter with:

- Property deal analysis (total investment, carrying costs, gross profit, ROI, and 70% rule max offer).
- Loan payment planning for renovation financing scenarios.
- Stage-based renovation progress tracking across core construction phases.
- Expense ledger with category totals and live spend summary.

## Deploy free on Cloudflare Pages

The app is configured for Cloudflare Pages and deploys from `main` or `master` using `.github/workflows/deploy-cloudflare.yml`.

1. Create a free Cloudflare account and a Pages project named `re-model`.
2. Create an API token with **Cloudflare Pages: Edit** access.
3. In GitHub **Settings → Secrets and variables → Actions**, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push or merge to `main`/`master`, or run **Deploy to Cloudflare Pages** manually from Actions.
5. Cloudflare publishes the site at `https://re-model.pages.dev` (or an available variant if that project name is already taken).

You can also deploy from an authenticated terminal with:

```bash
npm install
npm run deploy
```

> Cloudflare credentials are account secrets. They cannot be created or entered from this repository, so the one-time secret setup must be completed by the repository owner.

## Data source approach

The discovery MVP presents normalized demonstration listings and links back to public source sites. Production integrations should use licensed APIs, feeds, or approved affiliate/data agreements rather than scraping sites that prohibit automated access. Before an offer, users must independently verify property status, title, condition, comparable sales, and financial assumptions.

## Local development

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite. Create a production bundle with `npm run build`.

## Product Vision
Re-model gives investors, flippers, homeowners, and real estate professionals a single operating system for value-add renovation projects. The platform reduces risk, improves budget discipline, and increases return on investment through data-driven planning and execution workflows.

## Primary User Journey

### 1) Property Discovery & Analysis
Help users identify and evaluate renovation opportunities before making an offer.

- Search low-priced homes by neighborhood and investment criteria.
- Surface comparables (comps) for both current and post-renovation values.
- Estimate after-repair value (ARV) using local market trends.
- Run pre-purchase ROI and downside risk analysis.
- Highlight neighborhood appreciation signals and demand indicators.

### 2) Financial Planning & Funding
Enable confident financing decisions and accurate project budgets.

- Compare loan pathways: 203k, HELOC, cash-out refinance, and cash.
- Build room-by-room/category-based renovation budgets.
- Forecast total project cost, cash needed, and contingency buffers.
- Model carrying costs (interest, taxes, insurance, utilities, holding period).
- Project profit, margin, and return scenarios under multiple exit assumptions.

### 3) Project Management & Execution
Keep renovation work on schedule and aligned to budget.

- Track stages end-to-end:
  - Demolition
  - Framing
  - Electrical
  - Plumbing
  - Drywall
  - Flooring
  - Painting
  - Fixtures
  - Cleanup
- Maintain task lists, due dates, and dependencies by stage.
- Document progress with photos, notes, and milestone approvals.
- Coordinate contractors, inspections, and delivery schedules.

### 4) Expense Management & Accounting
Track every renovation dollar for profitability and taxes.

- Record materials, tools, permit fees, and labor spend.
- Manage contractor invoices, payment schedules, and change orders.
- Categorize expenses for accounting and tax reporting.
- Provide real-time project P&L visibility.
- Compare actual spend vs. budget by stage and category.

### 5) Future: 3D Modeling & Visualization
Plan, validate, and market renovation outcomes visually.

- Before/after concept visualization for decision support.
- Space planning tools for layouts and flow optimization.
- Material/finish preview for design choices.
- Shareable 3D tours for listings and investor updates.

## Target Users

### House Flippers
- Source undervalued properties quickly.
- Standardize renovation workflows across projects.
- Monitor timelines, budgets, and exit margins.

### Real Estate Investors
- Evaluate value-add opportunities for flips and rentals.
- Balance renovation ROI with long-term rental income strategy.
- Scale operations with portfolio-level reporting.

### Homeowners
- Plan personal renovations with realistic budgets.
- Coordinate contractors and schedules with less friction.
- Track impact of upgrades on home value.

### Real Estate Professionals
- Support clients with renovation and ROI analysis.
- Find opportunities and coordinate trusted contractor networks.
- Deliver higher-value advisory services.

## Value Propositions

### Risk Reduction
- Better acquisition decisions through ARV and comp analysis.
- Cost forecasting that reduces budget overruns.
- Stage-level control that catches execution risks earlier.

### Profit Maximization
- Prioritize highest-impact renovation choices.
- Control spend with transparent expense tracking.
- Time exits with neighborhood trend visibility.

### Process Efficiency
- Replace disconnected spreadsheets and tools.
- Centralize planning, execution, and accounting.
- Improve collaboration with contractors and stakeholders.

### Financial Intelligence
- Tax-ready expense categorization and reporting.
- Project and portfolio-level profitability insights.
- Organized documentation for lending and underwriting workflows.

## Business Model Opportunities

1. Subscriptions (monthly/annual).
2. Premium analytics tiers (advanced underwriting and portfolio insights).
3. Contractor referral partnerships.
4. Lending referral partnerships.
5. Transactional add-ons (valuation reports, templates, exports).

## Suggested MVP Scope

### Must-have (v1)
- Property analysis workspace (comps, ARV, ROI calculator).
- Renovation budget planner.
- Stage-based project tracker.
- Expense ledger with category tagging.
- Project profitability dashboard.

### Nice-to-have (v1.5)
- Contractor contact and invoice management.
- Portfolio overview for multi-property users.
- Exportable tax and lender reports.

### Later (v2+)
- 3D visualization.
- Automated listing/MLS marketing outputs.
- AI recommendations for renovation scope optimization.

## Success Metrics

- Time to first viable deal analysis.
- Budget variance (planned vs. actual).
- On-time stage completion rate.
- Profit per project and portfolio ROI.
- Monthly active projects per user.
- User retention by persona.

## Next Implementation Steps

1. Define data model for properties, comps, budgets, stages, and expenses.
2. Design core workflows and wireframes for the MVP journey.
3. Build ROI/ARV calculation engine with scenario modeling.
4. Implement stage-based project tracking and expense ingestion.
5. Ship reporting dashboard and validate with pilot users.
