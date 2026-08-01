from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from app.extensions import db


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    CORS(app, origins=[
        "https://career-compass-snowy.vercel.app",
        "http://localhost:5173",
    ])
    JWTManager(app)

    from app.routes.students import students_bp
    from app.routes.assessment import assessment_bp
    from app.routes.careers import careers_bp
    from app.routes.recommendations import recommendations_bp
    from app.routes.auth import auth_bp

    app.register_blueprint(students_bp)
    app.register_blueprint(assessment_bp)
    app.register_blueprint(careers_bp)
    app.register_blueprint(recommendations_bp)
    app.register_blueprint(auth_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "CareerCompass API"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app