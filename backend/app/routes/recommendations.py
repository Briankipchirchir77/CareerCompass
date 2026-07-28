from flask import Blueprint, jsonify, request
from app.models import Student
from app.services.recommendation_engine import generate_recommendations

recommendations_bp = Blueprint("recommendations", __name__, url_prefix="/api/students")


@recommendations_bp.post("/<int:student_id>/recommendations")
def create_recommendations(student_id):
    """
    Step 5 of the assessment flow: generate & persist career recommendations
    for a student, based on whatever grades/skills/interests they've submitted
    so far. This is the endpoint the "Zara AI" results screen calls.
    """
    student = Student.query.get_or_404(student_id)
    top_n = request.args.get("top_n", default=5, type=int)

    if not student.education_system:
        return jsonify({"error": "Student has not selected an education system yet"}), 400

    results = generate_recommendations(student, top_n=top_n, persist=True)
    return jsonify({
        "student_id": student.id,
        "recommendations": [
            {"career": career.to_dict(), "match_score": score} for career, score in results
        ],
    }), 201


@recommendations_bp.get("/<int:student_id>/recommendations")
def get_recommendations(student_id):
    """Fetch the most recently generated recommendations without recomputing."""
    student = Student.query.get_or_404(student_id)
    recs = sorted(student.recommendations, key=lambda r: r.match_score, reverse=True)
    return jsonify({
        "student_id": student.id,
        "recommendations": [r.to_dict() for r in recs],
    })
