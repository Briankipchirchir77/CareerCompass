from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models import Student

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/register")
def register():
    data = request.get_json(force=True) or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "name, email and password are required"}), 400

    if Student.query.filter_by(email=email).first():
        return jsonify({"error": "A student with this email already exists"}), 409

    student = Student(name=name, email=email)
    student.set_password(password)
    db.session.add(student)
    db.session.commit()

    access_token = create_access_token(identity=str(student.id))
    return jsonify({"access_token": access_token, "student": student.to_dict()}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(force=True) or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    student = Student.query.filter_by(email=email).first()
    if not student or not student.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(student.id))
    return jsonify({"access_token": access_token, "student": student.to_dict()}), 200