from datetime import datetime
from app.extensions import db


class CareerPath(db.Model):
    __tablename__ = "career_paths"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    industry = db.Column(db.String(80), nullable=True)
    demand_level = db.Column(db.String(20), default="Medium")  # Low | Medium | High

    required_skills = db.relationship(
        "RequiredSkill", backref="career", cascade="all, delete-orphan"
    )
    courses = db.relationship(
        "CareerCourse", backref="career", cascade="all, delete-orphan"
    )
    salary_estimates = db.relationship(
        "SalaryEstimate", backref="career", cascade="all, delete-orphan"
    )
    roadmap_steps = db.relationship(
        "LearningRoadmap",
        backref="career",
        cascade="all, delete-orphan",
        order_by="LearningRoadmap.step_order",
    )
    # Which academic subjects/learning-areas feed this career, and how strongly.
    subject_weights = db.relationship(
        "CareerSubjectWeight", backref="career", cascade="all, delete-orphan"
    )

    def to_dict(self, detailed=False):
        base = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "industry": self.industry,
            "demand_level": self.demand_level,
        }
        if detailed:
            base["required_skills"] = [rs.to_dict() for rs in self.required_skills]
            base["courses"] = [c.course.to_dict() for c in self.courses if c.course]
            base["salary_estimates"] = [s.to_dict() for s in self.salary_estimates]
            base["roadmap"] = [r.to_dict() for r in self.roadmap_steps]
        return base


class RequiredSkill(db.Model):
    __tablename__ = "required_skills"

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    importance_level = db.Column(db.Integer, default=3)  # 1 (nice to have) - 5 (critical)

    skill = db.relationship("Skill")

    def to_dict(self):
        return {
            "skill_id": self.skill_id,
            "name": self.skill.name if self.skill else None,
            "importance_level": self.importance_level,
        }


class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    provider = db.Column(db.String(100), nullable=True)
    duration = db.Column(db.String(50), nullable=True)
    level = db.Column(db.String(30), default="Beginner")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "provider": self.provider,
            "duration": self.duration,
            "level": self.level,
        }


class CareerCourse(db.Model):
    __tablename__ = "career_courses"

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)

    course = db.relationship("Course")


class SalaryEstimate(db.Model):
    __tablename__ = "salary_estimates"

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    region = db.Column(db.String(50), default="Kenya")
    entry_salary = db.Column(db.Integer, nullable=True)
    mid_salary = db.Column(db.Integer, nullable=True)
    senior_salary = db.Column(db.Integer, nullable=True)
    currency = db.Column(db.String(10), default="KES")

    def to_dict(self):
        return {
            "region": self.region,
            "currency": self.currency,
            "entry_salary": self.entry_salary,
            "mid_salary": self.mid_salary,
            "senior_salary": self.senior_salary,
        }


class LearningRoadmap(db.Model):
    __tablename__ = "learning_roadmaps"

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    step_order = db.Column(db.Integer, nullable=False)
    milestone_description = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {"step_order": self.step_order, "milestone": self.milestone_description}


class CareerSubjectWeight(db.Model):
    """
    Maps a career to the academic subjects/learning areas that matter for it,
    independent of grading system (we match by subject NAME across CBC/British
    where they overlap, e.g. "Mathematics", "Computer Science").
    """
    __tablename__ = "career_subject_weights"

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    subject_name = db.Column(db.String(50), nullable=False)
    weight = db.Column(db.Float, default=1.0)  # relative importance, 0-1


class Recommendation(db.Model):
    __tablename__ = "recommendations"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    career_id = db.Column(db.Integer, db.ForeignKey("career_paths.id"), nullable=False)
    match_score = db.Column(db.Float, nullable=False)  # 0-100
    generated_date = db.Column(db.DateTime, default=datetime.utcnow)

    career = db.relationship("CareerPath")

    def to_dict(self):
        return {
            "career": self.career.to_dict() if self.career else None,
            "match_score": round(self.match_score, 1),
            "generated_date": self.generated_date.isoformat() if self.generated_date else None,
        }
