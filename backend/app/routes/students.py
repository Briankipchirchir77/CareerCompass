from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Student

students_bp = Blueprint("students", __name__, url_prefix="/api/students")


@students_bp.post("")
def create_student():
    data = request.get_json(force=True) or {}
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "name and email are required"}), 400

    if Student.query.filter_by(email=email).first():
        return jsonify({"error": "A student with this email already exists"}), 409

    student = Student(name=name, email=email)
    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict()), 201


@students_bp.get("/<int:student_id>")
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    payload = student.to_dict()
    if student.cbc_profile:
        payload["cbc_profile"] = student.cbc_profile.to_dict()
    if student.british_profile:
        payload["british_profile"] = student.british_profile.to_dict()
    payload["skills"] = [s.to_dict() for s in student.skills]
    payload["interests"] = [i.to_dict() for i in student.interests]
    return jsonify(payload)


@students_bp.get("")
def list_students():
    students = Student.query.order_by(Student.created_at.desc()).all()
    return jsonify([s.to_dict() for s in students])
