import { useEffect, useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getQuestions } from "../services/questionApi";
import { saveAssessmentResult, scoreAssessment } from "../services/localData";

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuestions();
        const loadedQuestions = data.questions || data.data || data || [];
        setQuestions(loadedQuestions);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  function nextQuestion() {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentIndex];
    const nextAnswers = [
      ...answers,
      {
        question: currentQuestion?.question || currentQuestion?.text || currentQuestion?.title || "Question",
        answer: selectedAnswer,
      },
    ];
    setAnswers(nextAnswers);
    setSelectedAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const assessmentResult = scoreAssessment(nextAnswers);
      saveAssessmentResult(assessmentResult);
      setResult(assessmentResult);
      setCompleted(true);
    }
  }

  if (loading) {
    return (
      <Layout title="Assessment" subtitle="Loading your assessment questions...">
        <div className="info-card centered">
          <h3>Loading questions...</h3>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Assessment" subtitle="Please try again later.">
        <div className="info-card centered">
          <h3>{error}</h3>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout title="Assessment" subtitle="We do not have questions available right now.">
        <div className="info-card centered">
          <h3>No questions found.</h3>
        </div>
      </Layout>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Layout title="Assessment" subtitle="Answer a few reflective questions to discover your best-fit pathways.">
      {!completed ? (
        <div className="assessment-card">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <p className="eyebrow">Question {currentIndex + 1} of {questions.length}</p>
          <h3>{question?.question || question?.text || question?.title || "Question missing"}</h3>

          <div className="options-grid">
            {(question?.options || ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]).map((option) => {
              const optionLabel = typeof option === "string" ? option : option.text;

              return (
              <label key={optionLabel} className={`option-pill ${selectedAnswer === optionLabel ? "active" : ""}`}>
                <input
                  type="radio"
                  name="answer"
                  value={optionLabel}
                  checked={selectedAnswer === optionLabel}
                  onChange={() => setSelectedAnswer(optionLabel)}
                />
                <span>{optionLabel}</span>
              </label>
              );
            })}
          </div>

          <div className="button-row">
            <button className="btn-primary" onClick={nextQuestion}>
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              <FaArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="result-card">
          <FaCheckCircle />
          <h3>Assessment completed</h3>
          <p>
            Your responses have been saved. Your strongest pathway right now is{" "}
            <strong>{result?.topPathway?.title || "Career Explorer"}</strong>.
          </p>
          <div className="chip-row">
            {(result?.topPathway?.subjects || []).map((subject) => (
              <span key={subject} className="chip">{subject}</span>
            ))}
          </div>
          <ul className="list-compact">
            {answers.map((entry, index) => (
              <li key={`${entry.question}-${index}`}>
                <strong>{entry.question}</strong> — {entry.answer}
              </li>
            ))}
          </ul>
          <div className="button-row">
            <Link className="btn-primary" to="/recommendations">View recommendations</Link>
            <Link className="btn-secondary" to="/booking">Book a coach</Link>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Assessment;
