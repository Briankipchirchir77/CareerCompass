# CareerCompass 🧭

CareerCompass helps students discover career paths that genuinely fit their skills and personality, then hands them a personalized roadmap of resources to pursue that path — not just a quiz result.

## Table of Contents

- Features
- Tech Stack
- Getting Started
- Project Structure
- API Overview
- Roadmap
- Team Workflow
- Contributing
- License

## Features

**MVP (implemented):**

- 🔐 JWT-based authentication (register, login, password reset)
- 📝 Skills & personality assessment
- 🎯 Rule-based career matching engine
- 🗺️ Personalized learning roadmap per matched career
- ⭐ Save/bookmark favorite careers, with progress status (saved / in progress / completed)
- 🛠️ Admin catalog management — admins can create, edit, and retire careers and roadmap steps

**Planned (post-MVP):** see Roadmap below.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (SPA, client-side routing via React Router) |
| Backend | Flask REST API |
| Database | SQLite (dev) / PostgreSQL (production) |
| Auth | JWT (JSON Web Tokens) |

## Getting Started

### Prerequisites

- Node.js (v20+ or v22+) and npm
- Python 3.10+ and pip

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside `backend/`:

```
JWT_SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///careercompass.db
```

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
| POST | /api/auth/register | No | Create new user |
| POST | /api/auth/login | No | Authenticate, return JWT |
| POST | /api/auth/forgot-password | No | Request password reset token |
| POST | /api/auth/reset-password | No | Confirm reset with token |
| GET | /api/users/me | Yes | Get logged-in user's profile |
| PUT | /api/users/me | Yes | Update profile details |
| DELETE | /api/users/me | Yes | Delete own account |
| POST | /api/assessments | Yes | Submit assessment answers |
| GET | /api/assessments/latest | Yes | Get most recent assessment result |
| GET | /api/careers/matches | Yes | Get ranked career matches |
| GET | /api/careers/:id | Yes | Get full detail for a career |
| GET | /api/roadmaps/:career_id | Yes | Get roadmap for a career |
| POST | /api/careers/save | Yes | Bookmark a career |
| PUT | /api/careers/save/:id | Yes | Update status on a saved career |
| DELETE | /api/careers/save/:id | Yes | Remove a bookmarked career |
| POST | /api/admin/careers | Yes (admin) | Create a new career |
| PUT | /api/admin/careers/:id | Yes (admin) | Edit a career or its roadmap steps |
| DELETE | /api/admin/careers/:id | Yes (admin) | Retire a career from the catalog |

*(Full endpoint list maintained separately as the API grows.)*

## Roadmap

- [ ] CV builder
- [ ] Portfolio builder
- [ ] Real internship/scholarship data integration
- [ ] Progress analytics dashboard
- [ ] ML-based recommendation engine (v2 of matching)

## Team Workflow

- **Pull before you push.** Always run `git pull origin main` before starting work.
- **Use feature branches.** `git checkout -b feature/your-feature-name`, then merge via PR.
- **Commit often, with clear messages.**
- **Communicate before editing shared files** (like this README or core config files).

## Contributing

This is a team capstone project. All contributors commit directly to this shared repository — see commit history for individual contributions.

## License

Licensed under the MIT License — see LICENSE for details.
