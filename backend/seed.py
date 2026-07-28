"""
Seed the database with sample reference data: skills, interests, and a small
set of career paths with required skills, subject weights (used by the
recommendation engine), courses, salary estimates, and roadmap steps.

Run with: python seed.py
"""

from app import create_app
from app.extensions import db
from app.models import (
    Skill,
    Interest,
    CareerPath,
    RequiredSkill,
    Course,
    CareerCourse,
    SalaryEstimate,
    LearningRoadmap,
    CareerSubjectWeight,
)

app = create_app()


def get_or_create_skill(name, category="technical"):
    skill = Skill.query.filter_by(name=name).first()
    if not skill:
        skill = Skill(name=name, category=category)
        db.session.add(skill)
        db.session.flush()
    return skill


def get_or_create_interest(name, category=None):
    interest = Interest.query.filter_by(name=name).first()
    if not interest:
        interest = Interest(name=name, category=category)
        db.session.add(interest)
        db.session.flush()
    return interest


CAREERS = [
    {
        "title": "Software Engineer",
        "description": "Designs, builds, and maintains software applications and systems.",
        "industry": "Technology",
        "demand_level": "High",
        "subject_weights": {"Mathematics": 0.4, "Computer Science": 0.6},
        "skills": [("Python", 5), ("Problem Solving", 4), ("SQL", 3), ("Git", 2)],
        "salary": (60000, 120000, 250000),
        "courses": [("Python for Everyone", "Coursera", "8 weeks", "Beginner"),
                    ("Data Structures and Algorithms", "Pluralsight", "6 weeks", "Intermediate")],
        "roadmap": [
            "Learn programming fundamentals (Python or JavaScript)",
            "Build 3-5 small projects for your portfolio",
            "Learn data structures & algorithms",
            "Contribute to an open-source project or internship",
            "Apply for junior software engineer roles",
        ],
    },
    {
        "title": "Data Scientist",
        "description": "Analyzes data to extract insights and build predictive models.",
        "industry": "Technology",
        "demand_level": "High",
        "subject_weights": {"Mathematics": 0.6, "Computer Science": 0.4},
        "skills": [("Python", 5), ("SQL", 4), ("Data Analysis", 5), ("Excel", 2)],
        "salary": (70000, 140000, 280000),
        "courses": [("SQL Essential Training", "LinkedIn Learning", "4 weeks", "Beginner"),
                    ("Data Structures and Algorithms A-Z", "Udemy", "6 weeks", "Intermediate")],
        "roadmap": [
            "Learn statistics and probability",
            "Learn Python and pandas/numpy",
            "Practice with real datasets (Kaggle)",
            "Learn machine learning fundamentals",
            "Build a portfolio of data science projects",
        ],
    },
    {
        "title": "Cybersecurity Analyst",
        "description": "Protects systems and networks from digital attacks and vulnerabilities.",
        "industry": "Technology",
        "demand_level": "High",
        "subject_weights": {"Computer Science": 0.7, "Mathematics": 0.3},
        "skills": [("Networking", 4), ("Problem Solving", 4), ("Python", 2)],
        "salary": (55000, 110000, 220000),
        "courses": [("Introduction to Cybersecurity", "Coursera", "5 weeks", "Beginner")],
        "roadmap": [
            "Learn networking fundamentals",
            "Learn about common vulnerabilities & attacks",
            "Get a foundational certification (e.g. Security+)",
            "Practice in a home lab / CTF challenges",
            "Apply for SOC analyst / junior security roles",
        ],
    },
    {
        "title": "UX Designer",
        "description": "Designs intuitive, user-centered digital product experiences.",
        "industry": "Design",
        "demand_level": "Medium",
        "subject_weights": {"Creative Arts": 0.6, "Computer Science": 0.4},
        "skills": [("Design", 5), ("Empathy", 3), ("Communication", 3)],
        "salary": (45000, 90000, 180000),
        "courses": [("UX Design Fundamentals", "Coursera", "6 weeks", "Beginner")],
        "roadmap": [
            "Learn design principles and tools (Figma)",
            "Study user research methods",
            "Redesign 2-3 existing apps as practice projects",
            "Build a portfolio website",
            "Apply for junior UX/UI roles or internships",
        ],
    },
    {
        "title": "Business Analyst",
        "description": "Bridges business needs and technical solutions using data and process analysis.",
        "industry": "Business",
        "demand_level": "Medium",
        "subject_weights": {"Business Studies": 0.6, "Mathematics": 0.4},
        "skills": [("Excel", 4), ("Communication", 4), ("Data Analysis", 3), ("Leadership", 2)],
        "salary": (50000, 95000, 190000),
        "courses": [("Business Analysis Fundamentals", "LinkedIn Learning", "4 weeks", "Beginner")],
        "roadmap": [
            "Learn Excel and basic data analysis",
            "Learn business process mapping",
            "Practice with case studies",
            "Get an entry-level analyst internship",
            "Apply for junior business analyst roles",
        ],
    },
    {
        "title": "Agricultural Economist",
        "description": "Applies economic principles to agriculture, farming, and food systems.",
        "industry": "Agriculture",
        "demand_level": "Medium",
        "subject_weights": {"Agriculture": 0.5, "Business Studies": 0.3, "Mathematics": 0.2},
        "skills": [("Data Analysis", 3), ("Communication", 3)],
        "salary": (40000, 80000, 150000),
        "courses": [("Agricultural Economics Basics", "edX", "6 weeks", "Beginner")],
        "roadmap": [
            "Study agriculture and economics fundamentals",
            "Learn data analysis for agri-markets",
            "Intern with an agribusiness or NGO",
            "Specialize in agri-policy or agribusiness management",
            "Apply for roles in agri-finance or policy institutions",
        ],
    },
]


def run():
    with app.app_context():
        db.create_all()

        # Pre-seed a broad interest list matching common student interest categories
        for name in [
            "Technology", "Science", "Arts", "Business", "Healthcare",
            "Sports", "Design", "Writing", "Music", "Environment",
            "Social Work", "Engineering", "Agriculture",
        ]:
            get_or_create_interest(name)

        for c in CAREERS:
            career = CareerPath.query.filter_by(title=c["title"]).first()
            if not career:
                career = CareerPath(
                    title=c["title"],
                    description=c["description"],
                    industry=c["industry"],
                    demand_level=c["demand_level"],
                )
                db.session.add(career)
                db.session.flush()

            # Subject weights
            CareerSubjectWeight.query.filter_by(career_id=career.id).delete()
            for subject, weight in c["subject_weights"].items():
                db.session.add(
                    CareerSubjectWeight(career_id=career.id, subject_name=subject, weight=weight)
                )

            # Required skills
            RequiredSkill.query.filter_by(career_id=career.id).delete()
            for skill_name, importance in c["skills"]:
                skill = get_or_create_skill(skill_name)
                db.session.add(
                    RequiredSkill(career_id=career.id, skill_id=skill.id, importance_level=importance)
                )

            # Salary
            SalaryEstimate.query.filter_by(career_id=career.id).delete()
            entry, mid, senior = c["salary"]
            db.session.add(
                SalaryEstimate(career_id=career.id, region="Kenya", entry_salary=entry,
                                mid_salary=mid, senior_salary=senior, currency="KES")
            )

            # Courses
            CareerCourse.query.filter_by(career_id=career.id).delete()
            for title, provider, duration, level in c["courses"]:
                course = Course.query.filter_by(title=title).first()
                if not course:
                    course = Course(title=title, provider=provider, duration=duration, level=level)
                    db.session.add(course)
                    db.session.flush()
                db.session.add(CareerCourse(career_id=career.id, course_id=course.id))

            # Roadmap
            LearningRoadmap.query.filter_by(career_id=career.id).delete()
            for i, milestone in enumerate(c["roadmap"], start=1):
                db.session.add(
                    LearningRoadmap(career_id=career.id, step_order=i, milestone_description=milestone)
                )

        db.session.commit()
        print(f"Seeded {len(CAREERS)} careers with skills, courses, salaries, and roadmaps.")


if __name__ == "__main__":
    run()
