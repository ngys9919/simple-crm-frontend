<div align="center">

# Simple CRM — Frontend

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![GitHub Pages](https://img.shields.io/badge/Frontend-GitHub_Pages-222?logo=github)](https://ngys9919.github.io/simple-crm-frontend/)
[![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E?logo=railway&logoColor=white)](https://simple-crm-backend-production.up.railway.app/customers)

**A lightweight customer relationship management app — React SPA frontend backed by a REST API.**

[Live Demo](https://ngys9919.github.io/simple-crm-frontend/) · [API Endpoint](https://simple-crm-backend-production.up.railway.app/customers) · [Backend Repo](https://github.com/ngys9919/simple-crm-backend) · [Report Bug](https://github.com/ngys9919/simple-crm-frontend/issues)

</div>

---

## About

Simple CRM lets you manage customers: browse and search a list, view details, and create, edit and delete records. This repository is the **frontend**; together with the [backend repository](https://github.com/ngys9919/simple-crm-backend) it forms a complete full-stack application.

### Key features

| Feature | Description |
|---------|-------------|
| Customer management | List, search, view, create, edit and delete customers |
| Authentication | Login page with a protected `/app` area and role helper, session persisted in `localStorage` |
| Dashboard | Overview page inside a shared layout (header + sidebar) |
| Products page | Lazy-loaded (`React.lazy` + `Suspense`) for code splitting |
| State management | Context API + `useReducer` (`CustomerContext`, `AuthContext`) |
| Testing & CI/CD | Unit, component and integration tests; GitHub Actions test, build and deploy |

## Live deployment

| Part | URL |
|------|-----|
| Frontend (GitHub Pages) | https://ngys9919.github.io/simple-crm-frontend/ |
| Backend API (Railway) | https://simple-crm-backend-production.up.railway.app/customers |
| Backend source | https://github.com/ngys9919/simple-crm-backend |

## Tech stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, React Router 7, CSS Modules, lucide-react, react-spinners |
| Build tool | Vite 8 |
| Backend | REST API ([simple-crm-backend](https://github.com/ngys9919/simple-crm-backend)) hosted on Railway |
| Local mock API | json-server (`data/db.json`) |
| Testing | Vitest, React Testing Library, jest-dom, user-event, jsdom |
| Linting | ESLint 10 |
| CI/CD & Hosting | GitHub Actions, GitHub Pages |

## Architecture

```
┌──────────────────────────────────────────────┐
│  Browser — GitHub Pages (static SPA)         │
│  https://ngys9919.github.io/simple-crm-frontend/
│                                              │
│  React Router ─► Pages ─► Components         │
│        │                                     │
│  AuthContext   CustomerContext + reducer     │
│                       │ fetch(API_BASE/...)  │
└───────────────────────┼──────────────────────┘
                        │ HTTPS / JSON
                        ▼
┌──────────────────────────────────────────────┐
│  Backend REST API — Railway                  │
│  https://simple-crm-backend-production.up.railway.app
│  GET/POST /customers · GET/PUT/DELETE /customers/:id
└──────────────────────────────────────────────┘
```

The API base URL is injected at build time through `VITE_API_BASE_URL` and exposed as `API_BASE` in [App.jsx](src/App.jsx).

### Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Welcome | Public |
| `/login` | Login | Public |
| `/app` | Dashboard | Protected |
| `/app/products` | Products (lazy-loaded) | Protected |
| `/app/customers` | Customer list | Protected |
| `/app/customers/new` | New customer | Protected |
| `/app/customers/:id` | Customer detail | Protected |
| `/app/customers/:id/edit` | Edit customer | Protected |
| `*` | 404 | Public |

## Project structure

```
simple-crm-frontend/
├── .github/workflows/pages.yml   # CI: test → build → deploy to GitHub Pages
├── data/                         # json-server db + product/user seed data
├── scripts/generate-products.js  # Product data generator
├── public/                       # Static assets
├── src/
│   ├── App.jsx                   # Routes + API_BASE
│   ├── main.jsx                  # Entry point
│   ├── components/               # CustomerCard, CustomerDetail, SearchBar, Sidebar, ...
│   ├── contexts/                 # AuthContext, CustomerContext
│   ├── layouts/                  # RootLayout
│   ├── pages/                    # Route-level pages
│   ├── reducers/                 # customerReducer
│   ├── utils/                    # formatPrice
│   └── test/                     # unit / components / integration tests
├── .env.example                  # VITE_API_BASE_URL template
├── .env.development              # Local json-server URL
├── .env.production               # Railway backend URL
├── vite.config.js
└── package.json
```

## Getting started

### Prerequisites

- Node.js 22+ and npm

### Install

```bash
git clone https://github.com/ngys9919/simple-crm-frontend.git
cd simple-crm-frontend
npm install
```

### Environment

Copy `.env.example` to `.env` and set the API base URL:

| Mode | `VITE_API_BASE_URL` |
|------|---------------------|
| Development (`.env.development`) | `http://localhost:3001` (json-server) |
| Production (`.env.production`) | `https://simple-crm-backend-production.up.railway.app` |

### Run

Option A — local mock API (no backend needed):

```bash
npm run server   # json-server on http://localhost:3001
npm run dev      # Vite dev server (in a second terminal)
```

Option B — run the real backend from [simple-crm-backend](https://github.com/ngys9919/simple-crm-backend) (follow its README), then point `VITE_API_BASE_URL` at it and run `npm run dev`.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the Vite dev server |
| `npm run server` | Start json-server on port 3001 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |

## Testing

Tests live next to components or under `src/test/`:

- **Unit** — `customerReducer`, `formatPrice`
- **Component** — `SearchBar`, `ProductCard`, `ProductList`
- **Integration** — `CustomersPage`

```bash
npm test
```

## Deployment

The workflow in [.github/workflows/pages.yml](.github/workflows/pages.yml) runs on every push and PR to `main`: install → test → build → (on `main`) deploy to GitHub Pages. It also copies `index.html` to `404.html` as an SPA fallback so deep links work.

1. In the repo, go to **Settings → Pages** and set the source to **GitHub Actions**.
2. Under **Settings → Secrets and variables → Actions → Variables**, add `VITE_API_BASE_URL` = `https://simple-crm-backend-production.up.railway.app`.
3. Push to `main`.

The Vite `base` path is set to `/<repo-name>/` automatically in GitHub Actions (see [vite.config.js](vite.config.js)).

The backend is deployed separately on Railway from the [backend repository](https://github.com/ngys9919/simple-crm-backend).

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit and push your changes
4. Open a Pull Request against `main`

Issues and ideas are welcome via [GitHub Issues](https://github.com/ngys9919/simple-crm-frontend/issues).

## Developed by

>> Coder: **Ng Yew Seng (353F)**

>> NTU SCTP AI Engineering

>> for Module 4: DevSecOps - Automating Integration and Deployment

>> © Copyright 2026

## Acknowledgements

- NTU SCTP AIE Module 4 course materials
- [React](https://react.dev), [Vite](https://vite.dev), [Vitest](https://vitest.dev), [json-server](https://github.com/typicode/json-server)

<div align="center">

⭐ If you find this project useful, please star the repo!

</div>
