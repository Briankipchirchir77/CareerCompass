import { useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import Layout from "../components/Layout";
import { getAssessmentResult, getProfile } from "../services/localData";

const initialMessages = [
  { from: "coach", text: "Hello! I can help you shape your next career move. Ask me anything about pathways, skills, or confidence." },
];

export default function AiCoach() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const assessment = getAssessmentResult();
    const profile = getProfile();
    const question = input.trim();
    const lowerQuestion = question.toLowerCase();
    const userMessage = { from: "user", text: question };
    let replyText = "Start with one small action this week: review your top subjects, choose one project idea, and ask a coach for feedback.";

    if (lowerQuestion.includes("subject") || lowerQuestion.includes("igcse") || lowerQuestion.includes("cambridge")) {
      const subjects = assessment?.topPathway?.subjects || ["Mathematics", "English", "ICT", "Business Studies"];
      replyText = `For your current direction, compare these subjects first: ${subjects.join(", ")}. Pick the ones you enjoy and can practise consistently.`;
    } else if (lowerQuestion.includes("coach") || lowerQuestion.includes("mentor")) {
      replyText = "Book a coach session with one clear question, such as: Which subjects should I prioritise, and what project can prove my interest?";
    } else if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio")) {
      const pathway = assessment?.topPathway?.title || "your preferred pathway";
      replyText = `For ${pathway}, create a simple portfolio piece: define a problem, show your process, and explain what you learned.`;
    } else if (profile.goal) {
      replyText = `Since your goal is "${profile.goal}", choose one subject, one skill, and one coach conversation that moves that goal forward this month.`;
    }
    const reply = {
      from: "coach",
      text: replyText,
    };

    setMessages((prev) => [...prev, userMessage, reply]);
    setInput("");
  }

  return (
    <Layout title="AI Coach" subtitle="Get encouragement and practical next steps from your career guide.">
      <div className="chat-card">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={`${message.text}-${index}`} className={`chat-bubble ${message.from === "user" ? "user" : "coach"}`}>
              {message.from === "coach" ? <FaRobot /> : null}
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleSend}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the coach about your next step..." />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </Layout>
  );
}
