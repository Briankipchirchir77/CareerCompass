import Layout from "../components/Layout";

export default function Analytics() {
  return (
    <Layout title="Analytics" subtitle="Track your momentum, focus areas, and growth over time.">
      <div className="stats-grid">
        <article className="info-card">
          <p className="eyebrow">Weekly growth</p>
          <h3>+14%</h3>
          <p>Progress across study sessions and assessments.</p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Most active area</p>
          <h3>Creative problem solving</h3>
          <p>You consistently engage well with hands-on activities.</p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Next focus</p>
          <h3>Leadership skills</h3>
          <p>Build confidence through mentoring and presentations.</p>
        </article>
      </div>

      <div className="info-card">
        <h3>Progress snapshot</h3>
        <div className="progress-group">
          <div className="progress-label">
            <span>Career readiness</span>
            <strong>78%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "78%" }} />
          </div>
        </div>
        <div className="progress-group">
          <div className="progress-label">
            <span>Skill development</span>
            <strong>64%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "64%" }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}