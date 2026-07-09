# Security Bundle Builder

🔗 **[Live Demo](https://smart-home-builder-fe.vercel.app/)**

A multi-step, data-driven bundle builder for a home-security system, with a live review panel and a persisted cart — built as a frontend take-home.

## Tech stack

- **React + TypeScript** (Vite)
- **Zustand** — cart/checkout state and theme state, with the `persist` middleware for `localStorage`
- **React Query** — fetching and caching the product data
- **Axios** — typed API client
- **Lucide** — icons
- **NestJS** — a small bonus backend. It doesn't do anything beyond serving the same JSON over HTTP instead of importing it locally, kept intentionally minimal (no database, no Docker) so installation stays simple.

## Dark mode

The app also includes a dark mode toggle.

## Overview

The builder walks the shopper through a 4-step accordion (Cameras → Plan → Sensors → Accessories), with every step and every product card rendered from data rather than hardcoded per-product markup. Selections flow into a live review panel that stays in sync with the builder at all times. I tried to keep the codebase decoupled and organized by responsibility — data fetching, state, derived state, and presentation each live in their own layer rather than being mixed into components.

## State management

- **Active variant tracking** — alongside the cart, a separate map tracks which variant is currently "active" for each product, deciding which count the card's quantity stepper shows when you switch colors.
- Selecting a color only updates which variant is active; it never touches the cart itself — that's why switching back to a previously-selected color shows its quantity untouched.
- **Cart shape** — each cart entry stores its product ID, category, quantity, and variant ID. Products without real color/variant options simply have their variant ID set equal to their product ID, so the same cart shape and update logic work uniformly across every category.
- **Derived totals** — a separate hook recomputes everything the UI needs from the raw cart whenever it changes: line items grouped by category, item counts, subtotal, pre-discount subtotal, and savings.
- That hook is the one place that knows how to price a camera (variant-level pricing) versus a sensor/accessory/plan (a single flat price) — everything else just consumes its output.

## Trade-offs

- **Component organization:** most step-level components sit flat inside `components/`, while the review panel lives in its own nested folder. With only four steps this stayed easy to navigate, but if the product list grew I'd move every step into its own folder for consistency.
- **"Save my system for later":** the cart is already persisted to `localStorage` continuously via Zustand's `persist` middleware, on every change — not just on demand. That already satisfies the actual requirement (configure → leave → return → restored exactly as left). So the "Save my system for later" link currently has no logic behind it — there's nothing left for it to do. I left it in to match the design rather than remove it, but as it stands it's decorative.

## Getting started

### Prerequisites

- Node 18+
- npm


### 1. Clone

```bash
git clone https://github.com/PeterSamehShafik/smart-home-builder.git
cd smart-home-builder
```

### Quick Start (Optional)

For convenience, you can use one of the provided launcher scripts instead of running the commands manually:

- **Windows:** `start-windows.bat`
- **macOS:** `start-macos.command`

These scripts simply automate the steps described below (install dependencies, start the backend and frontend, and open the application in your browser). They're plain text files, so you can open and inspect their contents before running them if you'd like.


### 2. Backend (bonus API)

```bash
cd bundler-backend
npm install
npm run start:dev
```

Runs on `http://localhost:3000` and exposes `GET /cameras`, `GET /plans`, `GET /sensors`, `GET /accessories`.

### 3. Frontend

```bash
cd bundle-builder
npm install
npm run dev
```

Runs on `http://localhost:5173`. Open it in the browser — the app loads pre-seeded exactly as in the design, and the backend must be running for it to fetch data.
