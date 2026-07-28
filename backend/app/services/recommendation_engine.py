"""
Rule-based recommendation engine for CareerCompass.

Scoring approach (0-100 match score per career):
  - 50% Academic fit   -> how well the student's grades in relevant subjects
                          compare to the strongest possible performance,
                          weighted by how important each subject is to the career.
  - 30% Skills fit     -> proportion of the career's required skills the
                          student already has, weighted by importance_level.
  - 20% Interests fit  -> whether the student's interests overlap with the
                          career's industry/category.

This is intentionally simple and transparent (not ML-based) so it's easy to
explain in a final-year project write-up, and easy to swap out later for a
trained model without changing the API surface.
"""

from app.models import (
    CBC_PERFORMANCE_WEIGHT,
    BRITISH_GRADE_WEIGHT,
    CareerPath,
    Recommendation,
)
from app.extensions import db


def _academic_fit_score(student):
    """Returns 0-1 academic fit score using whichever profile the student has."""
    subject_scores = {}  # subject_name -> normalized 0-1 performance

    if student.education_system == "CBC" and student.cbc_profile:
        for grade in student.cbc_profile.grades:
            weight = CBC_PERFORMANCE_WEIGHT.get(grade.performance_level, 1)
            subject_scores[grade.learning_area] = weight / 4.0  # max weight is 4 (EE)

    elif student.education_system == "BRITISH" and student.british_profile:
        for grade in student.british_profile.grades:
            weight = BRITISH_GRADE_WEIGHT.get(grade.grade, 1)
            subject_scores[grade.subject] = weight / 8.0  # max weight is 8 (A*)

    return subject_scores


def _score_career_for_student(student, career, subject_scores, student_skill_ids, student_interest_names):
    # --- Academic fit (50%) ---
    academic_component = 0.0
    if career.subject_weights:
        total_weight = sum(sw.weight for sw in career.subject_weights) or 1.0
        weighted_sum = 0.0
        for sw in career.subject_weights:
            perf = subject_scores.get(sw.subject_name, 0.35)  # neutral-ish default if not graded
            weighted_sum += perf * sw.weight
        academic_component = weighted_sum / total_weight
    else:
        academic_component = 0.5  # no subject data configured for this career -> neutral

    # --- Skills fit (30%) ---
    skills_component = 0.0
    if career.required_skills:
        total_importance = sum(rs.importance_level for rs in career.required_skills) or 1
        matched_importance = sum(
            rs.importance_level for rs in career.required_skills if rs.skill_id in student_skill_ids
        )
        skills_component = matched_importance / total_importance
    else:
        skills_component = 0.5

    # --- Interests fit (20%) ---
    interests_component = 0.0
    industry = (career.industry or "").lower()
    title_words = set(career.title.lower().split())
    if student_interest_names:
        hits = 0
        for interest in student_interest_names:
            interest_l = interest.lower()
            if interest_l in industry or interest_l in title_words or industry in interest_l:
                hits += 1
        interests_component = min(hits / max(len(student_interest_names), 1), 1.0)
        # give partial credit even with no exact hits, so scores aren't harshly zero
        interests_component = max(interests_component, 0.15)
    else:
        interests_component = 0.3

    score = (academic_component * 0.5) + (skills_component * 0.3) + (interests_component * 0.2)
    return round(score * 100, 1)


def generate_recommendations(student, top_n=5, persist=True):
    """
    Scores every CareerPath against the given student and returns a ranked
    list of (career, score) tuples. If persist=True, also writes
    Recommendation rows to the database.
    """
    subject_scores = _academic_fit_score(student)
    student_skill_ids = {ss.skill_id for ss in student.skills}
    student_interest_names = [si.interest.name for si in student.interests if si.interest]

    careers = CareerPath.query.all()
    scored = []
    for career in careers:
        score = _score_career_for_student(
            student, career, subject_scores, student_skill_ids, student_interest_names
        )
        scored.append((career, score))

    scored.sort(key=lambda pair: pair[1], reverse=True)
    top = scored[:top_n]

    if persist:
        # Clear old recommendations for this student before writing fresh ones
        Recommendation.query.filter_by(student_id=student.id).delete()
        for career, score in top:
            db.session.add(
                Recommendation(student_id=student.id, career_id=career.id, match_score=score)
            )
        db.session.commit()

    return top
