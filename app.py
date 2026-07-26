import json
import mimetypes
import urllib.request
import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

API_KEY = "qa_sk_7e5b4d64f57ccafb0f6ea21154395f5cefd108a6"
API_URL = "https://api.quizapi.io/api/v1/questions"

CAREER_MAP = {
    "Technology": ["Software Engineering", "Data Science", "Cybersecurity", "Computer Science", "Product Design"],
    "Medicine": ["Medicine", "Nursing", "Pharmacy", "Medical Laboratory Science", "Public Health"],
    "Engineering": ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Aerospace Engineering"],
    "Business": ["Accounting", "Business Administration", "Marketing", "Economics", "Entrepreneurship"],
    "Agriculture": ["Agricultural Science", "Agribusiness", "Environmental Science", "Food Science"],
    "Education": ["Education", "Teaching", "Counseling", "Curriculum Development"],
    "Design": ["Graphic Design", "UX Design", "Architecture", "Interior Design"],
    "Music": ["Music Production", "Audio Engineering", "Composition", "Performing Arts"],
    "Sports": ["Sports Science", "Physiotherapy", "Coaching", "Sports Management"],
}


def build_question_payload(career_interest, grade):
    return {
        "category": career_interest,
        "difficulty": "easy",
        "limit": 10,
        "tags": [career_interest, grade],
        "description": f"10 questions for {career_interest} career exploration for {grade}",
        "career_interest": career_interest,
        "grade": grade,
    }


def get_fallback_questions(career_interest):
    base_questions = [
        {
            "question": f"Which skill is most useful for a student interested in {career_interest}?",
            "answers": {
                "answer_a": "Problem solving",
                "answer_b": "Ignoring feedback",
                "answer_c": "Avoiding practice",
                "answer_d": "Skipping planning",
            },
            "correct_answers": {"answer_a_correct": "true"},
        },
        {
            "question": f"What is a strong habit for success in {career_interest}?",
            "answers": {
                "answer_a": "Consistent learning",
                "answer_b": "Procrastination",
                "answer_c": "Giving up easily",
                "answer_d": "Ignoring deadlines",
            },
            "correct_answers": {"answer_a_correct": "true"},
        },
    ]
    return [
        {**base_questions[index % len(base_questions)], "question": f"{base_questions[index % len(base_questions)]['question']} ({index + 1})"}
        for index in range(10)
    ]


def fetch_questions(career_interest, grade):
    payload = build_question_payload(career_interest, grade)
    params = urllib.parse.urlencode({
        "limit": payload["limit"],
        "difficulty": payload["difficulty"],
        "tags": f"{career_interest},{grade}",
    })
    url = f"{API_URL}?{params}"
    request = urllib.request.Request(
        url,
        headers={
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
            if isinstance(data, dict) and isinstance(data.get("data"), list):
                data = data["data"]
            if isinstance(data, list) and data:
                return data[:10]
    except Exception as exc:
        print("Quiz API error:", exc)
    return get_fallback_questions(career_interest)


def recommend_career(interest):
    return CAREER_MAP.get(interest, ["General Career Guidance"])[0]


def grade_answers(answers, career_interest):
    if not isinstance(answers, list):
        answers = []
    correct_count = 0
    for answer in answers[:10]:
        if answer in {"answer_a", "answer_b", "answer_c", "answer_d"}:
            correct_count += 1
    score = min(100, round((correct_count / 10) * 100))
    base_recommendation = recommend_career(career_interest)
    if score >= 80:
        recommendation = base_recommendation
    elif score >= 60:
        recommendation = f"{base_recommendation} + Related Path"
    else:
        recommendation = f"Exploratory Path in {base_recommendation}"
    return {"score": score, "recommendation": recommendation}


class AssessmentHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api/assessment"):
            self.send_json({"status": "ok"})
            return

        file_path = Path(__file__).resolve().parent / self.path.lstrip("/")
        if self.path in {"/", "/index.html"}:
            file_path = Path(__file__).resolve().parent / "assessment.html"
        if file_path.exists() and file_path.is_file():
            content = file_path.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", self._content_type(file_path))
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_error(404, "Page not found")

    def do_POST(self):
        if self.path.startswith("/api/assessment"):
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length).decode("utf-8") if length else "{}"
            data = json.loads(body) if body else {}
            career_interest = data.get("career_interest") or "Technology"
            grade = data.get("grade") or "Grade 10"
            answers = data.get("answers") or []
            questions = fetch_questions(career_interest, grade)
            result = grade_answers(answers, career_interest)
            self.send_json({
                "career_interest": career_interest,
                "grade": grade,
                "questions": questions,
                "result": result,
            })
            return
        self.send_error(404, "Route not found")

    def send_json(self, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _content_type(self, path):
        return mimetypes.guess_type(str(path))[0] or "application/octet-stream"


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 5000), AssessmentHandler)
    print("Assessment server running at http://127.0.0.1:5000")
    server.serve_forever()
