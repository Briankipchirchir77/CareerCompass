from datetime import datetime
from app.extensions import db


class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # "CBC" or "BRITISH"
    education_system = db.Column(db.String(20), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    cbc_profile = db.relationship(
        "CbcProfile", backref="student", uselist=False, cascade="all, delete-orphan"
    )
    british_profile = db.relationship(
        "BritishProfile", backref="student", uselist=False, cascade="all, delete-orphan"
    )
    skills = db.relationship(
        "StudentSkill", backref="student", cascade="all, delete-orphan"
    )
    interests = db.relationship(
        "StudentInterest", backref="student", cascade="all, delete-orphan"
    )
    recommendations = db.relationship(
        "Recommendation", backref="student", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "education_system": self.education_system,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    category = db.Column(db.String(30), default="technical")  # technical | soft

    def to_dict(self):
        return {"id": self.id, "name": self.name, "category": self.category}


class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    category = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "category": self.category}


class StudentSkill(db.Model):
    __tablename__ = "student_skills"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    proficiency_level = db.Column(db.String(20), default="intermediate")  # beginner|intermediate|advanced

    skill = db.relationship("Skill")

    __table_args__ = (db.UniqueConstraint("student_id", "skill_id", name="uq_student_skill"),)

    def to_dict(self):
        return {
            "skill_id": self.skill_id,
            "name": self.skill.name if self.skill else None,
            "proficiency_level": self.proficiency_level,
        }


class StudentInterest(db.Model):
    __tablename__ = "student_interests"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    interest_id = db.Column(db.Integer, db.ForeignKey("interests.id"), nullable=False)

    interest = db.relationship("Interest")

    __table_args__ = (db.UniqueConstraint("student_id", "interest_id", name="uq_student_interest"),)

    def to_dict(self):
        return {"interest_id": self.interest_id, "name": self.interest.name if self.interest else None}
