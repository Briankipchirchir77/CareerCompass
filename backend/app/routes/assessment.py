from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import (
    Student,
    CbcProfile,
    CbcLearningAreaGrade,
    BritishProfile,
    BritishSubjectGrade,
    Skill,
    Interest,
    StudentSkill,
    StudentInterest,
    CBC_LEVELS,
    CBC_LEARNING_AREAS,
    CBC_PERFORMANCE_LEVELS,
    CBC_PERFORMANCE_LABELS,
    BRITISH_QUALIFICATIONS,
    BRITISH_SUBJECTS,
    BRITISH_GRADES,
)

assessment_bp = Blueprint("assessment", __name__, url_prefix="/api")

QUESTION_BANK = [
    {
        "id": 1,
        "question": "I enjoy solving problems using computers.",
        "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    },
    {
        "id": 2,
        "question": "I enjoy turning ideas into visual stories, products, or experiences.",
        "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    },
    {
        "id": 3,
        "question": "I like finding patterns in information and using them to make decisions.",
        "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    },
    {
        "id": 4,
        "question": "I feel energised when I help a team organise, communicate, or move forward.",
        "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    },
    {
        "id": 5,
        "question": "I would enjoy learning through real projects with people outside the classroom.",
        "options": ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    },
]


@assessment_bp.get("/questions")
def get_questions():
    return jsonify({"questions": QUESTION_BANK})


# ---------------------------------------------------------------------------
# Step 1: Education system metadata (drives the frontend's branching UI)
# ---------------------------------------------------------------------------

@assessment_bp.get("/education-systems")
def get_education_systems():
    return jsonify({
        "systems": [
            {
                "code": "CBC",
                "name": "CBC",
                "description": "Competency-based curriculum, grades 7-12",
                "levels": CBC_LEVELS,
                "learning_areas": CBC_LEARNING_AREAS,
                "performance_levels": [
                    {"code": code, "label": label}
                    for code, label in CBC_PERFORMANCE_LABELS.items()
                ],
            },
            {
                "code": "BRITISH",
                "name": "British curriculum",
                "description": "IGCSE, AS Level, A Level",
                "qualifications": BRITISH_QUALIFICATIONS,
                "subjects": BRITISH_SUBJECTS,
                "grades": BRITISH_GRADES,
            },
        ]
    })


# ---------------------------------------------------------------------------
# Step 2: Submit grades — branches on education_system
# ---------------------------------------------------------------------------

@assessment_bp.post("/students/<int:student_id>/grades/cbc")
def submit_cbc_grades(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json(force=True) or {}

    current_level = data.get("current_level")
    learning_areas = data.get("learning_areas", {})  # { "Mathematics": "ME", ... }

    if current_level not in CBC_LEVELS:
        return jsonify({"error": f"current_level must be one of {CBC_LEVELS}"}), 400

    invalid_areas = [a for a in learning_areas if a not in CBC_LEARNING_AREAS]
    if invalid_areas:
        return jsonify({"error": f"Unknown learning area(s): {invalid_areas}"}), 400

    invalid_levels = [
        (a, lvl) for a, lvl in learning_areas.items() if lvl not in CBC_PERFORMANCE_LEVELS
    ]
    if invalid_levels:
        return jsonify({"error": f"Invalid performance level(s): {invalid_levels}"}), 400

    student.education_system = "CBC"
    if student.british_profile:
        db.session.delete(student.british_profile)

    profile = student.cbc_profile or CbcProfile(student_id=student.id)
    profile.current_level = current_level
    if not profile.id:
        db.session.add(profile)
    db.session.flush()

    CbcLearningAreaGrade.query.filter_by(profile_id=profile.id).delete()
    for area, level in learning_areas.items():
        db.session.add(
            CbcLearningAreaGrade(profile_id=profile.id, learning_area=area, performance_level=level)
        )

    db.session.commit()
    return jsonify(profile.to_dict()), 200


@assessment_bp.post("/students/<int:student_id>/grades/british")
def submit_british_grades(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json(force=True) or {}

    qualification = data.get("qualification")
    subjects = data.get("subjects", {})  # { "Mathematics": "A", ... }

    if qualification not in BRITISH_QUALIFICATIONS:
        return jsonify({"error": f"qualification must be one of {BRITISH_QUALIFICATIONS}"}), 400

    invalid_subjects = [s for s in subjects if s not in BRITISH_SUBJECTS]
    if invalid_subjects:
        return jsonify({"error": f"Unknown subject(s): {invalid_subjects}"}), 400

    invalid_grades = [(s, g) for s, g in subjects.items() if g not in BRITISH_GRADES]
    if invalid_grades:
        return jsonify({"error": f"Invalid grade(s): {invalid_grades}"}), 400

    student.education_system = "BRITISH"
    if student.cbc_profile:
        db.session.delete(student.cbc_profile)

    profile = student.british_profile or BritishProfile(student_id=student.id)
    profile.qualification = qualification
    if not profile.id:
        db.session.add(profile)
    db.session.flush()

    BritishSubjectGrade.query.filter_by(profile_id=profile.id).delete()
    for subject, grade in subjects.items():
        db.session.add(
            BritishSubjectGrade(profile_id=profile.id, subject=subject, grade=grade)
        )

    db.session.commit()
    return jsonify(profile.to_dict()), 200


# ---------------------------------------------------------------------------
# Step 3 & 4: Interests and skills
# ---------------------------------------------------------------------------

@assessment_bp.get("/interests")
def list_interests():
    interests = Interest.query.order_by(Interest.name).all()
    return jsonify([i.to_dict() for i in interests])


@assessment_bp.get("/skills")
def list_skills():
    skills = Skill.query.order_by(Skill.name).all()
    return jsonify([s.to_dict() for s in skills])


@assessment_bp.post("/students/<int:student_id>/interests")
def set_student_interests(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json(force=True) or {}
    interest_names = data.get("interests", [])

    StudentInterest.query.filter_by(student_id=student.id).delete()
    for name in interest_names:
        interest = Interest.query.filter_by(name=name).first()
        if not interest:
            interest = Interest(name=name)
            db.session.add(interest)
            db.session.flush()
        db.session.add(StudentInterest(student_id=student.id, interest_id=interest.id))

    db.session.commit()
    return jsonify([si.to_dict() for si in student.interests]), 200


@assessment_bp.post("/students/<int:student_id>/skills")
def set_student_skills(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json(force=True) or {}
    skills_payload = data.get("skills", [])  # [{"name": "Python", "proficiency_level": "advanced"}]

    StudentSkill.query.filter_by(student_id=student.id).delete()
    for entry in skills_payload:
        name = entry.get("name") if isinstance(entry, dict) else entry
        proficiency = entry.get("proficiency_level", "intermediate") if isinstance(entry, dict) else "intermediate"

        skill = Skill.query.filter_by(name=name).first()
        if not skill:
            skill = Skill(name=name)
            db.session.add(skill)
            db.session.flush()
        db.session.add(
            StudentSkill(student_id=student.id, skill_id=skill.id, proficiency_level=proficiency)
        )

    db.session.commit()
    return jsonify([ss.to_dict() for ss in student.skills]), 200
