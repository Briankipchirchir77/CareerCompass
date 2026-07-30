import { Link } from "react-router-dom";
import { FaArrowRight, FaBrain, FaRoute, FaChartLine } from "react-icons/fa";
import Layout from "../components/Layout";

function Dashboard() {
  const stats = [
    { label: "Readiness score", value: "82%", note: "Strong alignment with tech and design paths" },
    { label: "Courses planned", value: "6", note: "Balanced across leadership and creativity" },
    { label: "Coach sessions", value: "3", note: "Next session this Thursday" },
  ];

  const milestones = [
    "Complete the career assessment",
    "Review your AI coaching feedback",
    "Book a mock interview session",
  ];

  return (
    <Layout title="Dashboard" subtitle="Your career journey is moving forward with clarity and momentum.">
      <div className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="info-card">
            <p className="eyebrow">{item.label}</p>
            <h3>{item.value}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <section className="hero-panel">
        <div>
          <p className="eyebrow">Recommended next step</p>
          <h3>Explore AI, design, and data pathways</h3>
          <p>Your profile shows strong curiosity in problem-solving and storytelling, making these tracks especially promising.</p>
          <div className="button-row">
            <Link className="btn-primary" to="/recommendations">View recommendations</Link>
            <Link className="btn-secondary" to="/assessment">Take assessment</Link>
          </div>
        </div>

        <div className="hero-badge">
          <FaBrain />
          <span>AI-powered guidance</span>
        </div>
      </section>

      <div className="panel-grid">
        <article className="info-card">
          <h3>Upcoming milestones</h3>
          <ul className="list-compact">
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="info-card">
          <h3>Quick links</h3>
          <div className="link-list">
            <Link to="/roadmap"><FaRoute /> Roadmap</Link>
            <Link to="/analytics"><FaChartLine /> Analytics</Link>
            <Link to="/ai-coach"><FaArrowRight /> AI Coach</Link>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export default Dashboard;