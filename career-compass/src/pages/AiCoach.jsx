import { useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import Layout from "../components/Layout";

const initialMessages = [
  { from: "coach", text: "Hello! I can help you shape your next career move. Ask me anything about pathways, skills, or confidence." },
];

export default function AiCoach() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const reply = {
      from: "coach",
      text: "That is a thoughtful question. I recommend focusing on a portfolio project and one mentor conversation this week.",
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