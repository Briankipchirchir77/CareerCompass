from flask import Blueprint, jsonify
from app.models import CareerPath

careers_bp = Blueprint("careers", __name__, url_prefix="/api/careers")


@careers_bp.get("")
def list_careers():
    careers = CareerPath.query.order_by(CareerPath.title).all()
    return jsonify([c.to_dict() for c in careers])


@careers_bp.get("/<int:career_id>")
def get_career(career_id):
    career = CareerPath.query.get_or_404(career_id)
    return jsonify(career.to_dict(detailed=True))
