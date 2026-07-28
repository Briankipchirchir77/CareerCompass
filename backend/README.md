# CareerCompass Backend

Flask + SQLAlchemy backend for the CareerCompass career guidance app.
Supports both the **CBC** and **British curriculum** assessment branches,
a rule-based recommendation engine, and endpoints for the full assessment
flow: Education System → Grades → Interests → Skills → Recommendations.

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python seed.py                  # creates tables + sample careers/skills
python run.py                   # runs on http://localhost:5000
```

## Project structure

```
app/
  __init__.py           # Flask app factory
  extensions.py         # SQLAlchemy instance
  models/
    student.py           # Student, Skill, Interest, join tables
    grades.py             # CBC + British grading models & reference lists
    career.py             # CareerPath, RequiredSkill, Course, SalaryEstimate,
                           # LearningRoadmap, CareerSubjectWeight, Recommendation
  routes/
    students.py            # student CRUD
    assessment.py           # education systems, grades, interests, skills
    careers.py               # browse career paths
    recommendations.py        # generate/fetch recommendations (Zara AI results)
  services/
    recommendation_engine.py  # rule-based scoring logic
seed.py                  # sample reference + career data
run.py                   # entry point
config.py                # app config (reads DATABASE_URL env var if set)
```

## API Reference

### Health
`GET /api/health`

### Education systems (Step 1)
`GET /api/education-systems` — returns CBC and British curriculum metadata
(levels/learning areas/performance levels, or qualifications/subjects/grades)
so the frontend can render the branching UI dynamically.

### Students
- `POST /api/students` — `{ "name": "...", "email": "..." }`
- `GET /api/students` — list all
- `GET /api/students/<id>` — full profile including grades, skills, interests

### Grades (Step 2 — branches by education system)
- `POST /api/students/<id>/grades/cbc`
  ```json
  {
    "current_level": "Grade 11",
    "learning_areas": { "Mathematics": "ME", "English": "EE" }
  }
  ```
  Valid performance levels: `EE`, `ME`, `AE`, `BE`

- `POST /api/students/<id>/grades/british`
  ```json
  {
    "qualification": "A Level",
    "subjects": { "Mathematics": "A*", "Physics": "A" }
  }
  ```
  Valid grades: `A*`, `A`, `B`, `C`, `D`, `E`, `F`, `G`

Submitting one branch clears any existing profile from the other branch for
that student (a student is CBC *or* British at a time).

### Interests & Skills (Steps 3 & 4)
- `GET /api/interests` / `GET /api/skills` — reference lists
- `POST /api/students/<id>/interests` — `{ "interests": ["Technology", "Business"] }`
- `POST /api/students/<id>/skills` —
  `{ "skills": [{"name": "Python", "proficiency_level": "advanced"}] }`
  (skills/interests not already in the DB are created automatically)

### Careers
- `GET /api/careers` — list all career paths (summary)
- `GET /api/careers/<id>` — full detail: required skills, courses, salary,
  roadmap

### Recommendations (Step 5 — "Zara AI" results)
- `POST /api/students/<id>/recommendations?top_n=5` — scores every career
  against the student's grades/skills/interests, persists the top N as
  `Recommendation` rows, and returns them
- `GET /api/students/<id>/recommendations` — fetch the last generated set
  without recomputing

## Recommendation engine

Located in `app/services/recommendation_engine.py`. It's a transparent,
rule-based scorer (not ML) — easy to explain in a project write-up and easy
to swap for a trained model later without changing the API:

- **50% Academic fit** — normalizes CBC performance levels (EE/ME/AE/BE) or
  British grades (A*-G) to a 0–1 scale, weighted by each career's
  `CareerSubjectWeight` entries (e.g. Software Engineer weighs Mathematics
  0.4 and Computer Science 0.6).
- **30% Skills fit** — proportion of a career's required skills the student
  has, weighted by `importance_level` (1–5).
- **20% Interests fit** — overlap between the student's interests and the
  career's industry/title.

## Notes on scope

This backend matches the "Career Path Simulator" data model and the CBC/
British grading structure discussed in the project doc — it does not yet
implement the full CareerPilot/CareerCompass surface (auth, chat with Zara
AI, goals, admin dashboard). Those would be natural next additions:
authentication (Flask-JWT or Flask-Login), a `/api/chat` endpoint backed by
an LLM for "Chat with Zara," and a `Goal` model for the Goals screen.
