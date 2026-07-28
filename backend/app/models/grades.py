from app.extensions import db

# ---------------------------------------------------------------------------
# Reference data (fixed lists — validated against these in the routes layer)
# ---------------------------------------------------------------------------

CBC_LEVELS = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]

CBC_LEARNING_AREAS = [
    "Mathematics",
    "English",
    "Kiswahili",
    "Integrated Science",
    "Social Studies",
    "Computer Science",
    "Business Studies",
    "Agriculture",
    "Creative Arts",
]

CBC_PERFORMANCE_LEVELS = [
    "EE",  # Exceeds Expectation
    "ME",  # Meets Expectation
    "AE",  # Approaches Expectation
    "BE",  # Below Expectation
]

CBC_PERFORMANCE_LABELS = {
    "EE": "Exceeds Expectation",
    "ME": "Meets Expectation",
    "AE": "Approaches Expectation",
    "BE": "Below Expectation",
}

# Numeric weight used by the recommendation engine (higher = stronger performance)
CBC_PERFORMANCE_WEIGHT = {"EE": 4, "ME": 3, "AE": 2, "BE": 1}

BRITISH_QUALIFICATIONS = ["IGCSE", "AS Level", "A Level"]

BRITISH_SUBJECTS = [
    "Mathematics",
    "English Language",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Business Studies",
    "Economics",
]

BRITISH_GRADES = ["A*", "A", "B", "C", "D", "E", "F", "G"]

# Numeric weight used by the recommendation engine (higher = stronger performance)
BRITISH_GRADE_WEIGHT = {"A*": 8, "A": 7, "B": 6, "C": 5, "D": 4, "E": 3, "F": 2, "G": 1}


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class CbcProfile(db.Model):
    """One-to-one with Student when education_system == 'CBC'."""
    __tablename__ = "cbc_profiles"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False, unique=True)
    current_level = db.Column(db.String(20), nullable=False)  # e.g. "Grade 11"

    grades = db.relationship(
        "CbcLearningAreaGrade", backref="profile", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "current_level": self.current_level,
            "learning_areas": [g.to_dict() for g in self.grades],
        }


class CbcLearningAreaGrade(db.Model):
    __tablename__ = "cbc_learning_area_grades"

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey("cbc_profiles.id"), nullable=False)
    learning_area = db.Column(db.String(50), nullable=False)  # one of CBC_LEARNING_AREAS
    performance_level = db.Column(db.String(2), nullable=False)  # one of CBC_PERFORMANCE_LEVELS

    __table_args__ = (
        db.UniqueConstraint("profile_id", "learning_area", name="uq_cbc_area_per_profile"),
    )

    def to_dict(self):
        return {
            "learning_area": self.learning_area,
            "performance_level": self.performance_level,
            "performance_label": CBC_PERFORMANCE_LABELS.get(self.performance_level),
        }


class BritishProfile(db.Model):
    """One-to-one with Student when education_system == 'BRITISH'."""
    __tablename__ = "british_profiles"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False, unique=True)
    qualification = db.Column(db.String(20), nullable=False)  # one of BRITISH_QUALIFICATIONS

    grades = db.relationship(
        "BritishSubjectGrade", backref="profile", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "qualification": self.qualification,
            "subjects": [g.to_dict() for g in self.grades],
        }


class BritishSubjectGrade(db.Model):
    __tablename__ = "british_subject_grades"

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey("british_profiles.id"), nullable=False)
    subject = db.Column(db.String(50), nullable=False)  # one of BRITISH_SUBJECTS
    grade = db.Column(db.String(2), nullable=False)  # one of BRITISH_GRADES

    __table_args__ = (
        db.UniqueConstraint("profile_id", "subject", name="uq_british_subject_per_profile"),
    )

    def to_dict(self):
        return {"subject": self.subject, "grade": self.grade}
