# CareerCompass 🧭

**Discover a career path that actually fits you — then get a roadmap to pursue it.**

CareerCompass helps students figure out career paths that genuinely match their skills and personality, and hands them a personalized, step-by-step roadmap of resources to pursue that path. Not just a quiz result — a plan.

![Status](https://img.shields.io/badge/status-capstone--final--phase-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Node](https://img.shields.io/badge/node-20%2B-green)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Roadmap](#roadmap)
- [Team & Workflow](#team--workflow)
- [Contributing](#contributing)
- [License](#license)

## Overview

Students often pick a career direction based on guesswork or peer pressure, without a clear sense of what the day-to-day work looks like or how to actually get there. CareerCompass closes that gap in three steps:

1. **Assess** — a short skills & personality assessment
2. **Match** — a rule-based engine ranks careers against the user's profile
3. **Guide** — each matched career comes with a concrete, ordered roadmap of resources and milestones

## Features

**MVP (implemented)**

| Feature | Description |
| --- | --- |
| 🔐 Authentication | JWT-based register, login, and password reset |
| 📝 Assessment | Skills & personality questionnaire |
| 🎯 Matching engine | Rule-based, weighted tag-matching against the career catalog |
| 🗺️ Roadmaps | Personalized, step-by-step learning path per matched career |
| ⭐ Saved careers | Bookmark careers with status tracking (saved / in progress / completed) |
| 🛠️ Admin catalog | Admins can create, edit, and retire careers and roadmap steps |

**Planned (post-MVP)** — see [Roadmap](#roadmap)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (SPA, client-side routing via React Router) |
| Backend | Flask REST API |
| Database | SQLite (dev) / PostgreSQL (production) |
| Auth | JWT (JSON Web Tokens) |

## Getting Started

### Prerequisites

- Node.js v20+ (or v22+) and npm
- Python 3.10+ and pip

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Backend runs at `http://localhost:5000` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` by default (Vite).

### Environment Variables

Create a `.env` file inside `backend/`:

```
JWT_SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///careercompass.db
```

Create a `.env` file inside `frontend/` (see `.env.example`):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Seeding Sample Data

```bash
cd backend
python seed.py
```

This populates the catalog with sample careers and roadmap steps so the app is usable immediately after setup.

## Project Structure

```
CareerCompass/
├── backend/
│   ├── app/
│   │   ├── models/      # SQLAlchemy models
│   │   ├── routes/      # Flask blueprints / endpoints
│   │   └── extensions.py
│   ├── config.py
│   ├── requirements.txt
│   ├── run.py
│   └── seed.py
├── frontend/            # React SPA frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── docs/
└── README.md
```

## API Overview

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Create new user |
| POST | `/api/auth/login` | No | Authenticate, return JWT |
| POST | `/api/auth/forgot-password` | No | Request password reset token |
| POST | `/api/auth/reset-password` | No | Confirm reset with token |
| GET | `/api/users/me` | Yes | Get logged-in user's profile |
| PUT | `/api/users/me` | Yes | Update profile details |
| DELETE | `/api/users/me` | Yes | Delete own account |
| POST | `/api/assessments` | Yes | Submit assessment answers |
| GET | `/api/assessments/latest` | Yes | Get most recent assessment result |
| GET | `/api/careers/matches` | Yes | Get ranked career matches |
| GET | `/api/careers/:id` | Yes | Get full detail for a career |
| GET | `/api/roadmaps/:career_id` | Yes | Get roadmap for a career |
| POST | `/api/careers/save` | Yes | Bookmark a career |
| PUT | `/api/careers/save/:id` | Yes | Update status on a saved career |
| DELETE | `/api/careers/save/:id` | Yes | Remove a bookmarked career |
| POST | `/api/admin/careers` | Yes (admin) | Create a new career |
| PUT | `/api/admin/careers/:id` | Yes (admin) | Edit a career or its roadmap steps |
| DELETE | `/api/admin/careers/:id` | Yes (admin) | Retire a career from the catalog |

*(Full endpoint list maintained separately in `docs/` as the API grows.)*

## Roadmap

- [ ] CV builder
- [ ] Portfolio builder
- [ ] Real internship/scholarship data integration
- [ ] Progress analytics dashboard
- [ ] ML-based recommendation engine (v2 of matching)

## Team & Workflow

CareerCompass is a team capstone project built with a standard feature-branch workflow:

- **Pull before you push.** Always run `git pull origin main` before starting work.
- **Use feature branches**, named by type:
  - `feature/<name>` — new functionality
  - `fix/<name>` — bug fixes
  - `docs/<name>` — documentation changes
- **Open a PR to merge.** Direct pushes to `main` are avoided; changes go through pull request review.
- **Commit often, with clear, descriptive messages.**
- **Communicate before editing shared files** (this README, core config, shared models) to avoid merge conflicts.

## Contributing

This is a team capstone project. All contributors work through feature branches and pull requests against this shared repository — see commit history and closed PRs for individual contributions.

To contribute:

1. Create a branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit with a clear message
3. Push and open a pull request against `main`
4. Request review from at least one teammate before merging

## License

Licensed under the MIT License — see [LICENSE](LICENSE) for details.