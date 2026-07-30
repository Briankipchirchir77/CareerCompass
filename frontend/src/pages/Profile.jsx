import Layout from "../components/Layout";

export default function Profile() {
  return (
    <Layout title="Profile" subtitle="Your profile is shaping a personalised and supportive plan.">
      <div className="profile-card">
        <div>
          <p className="eyebrow">Student profile</p>
          <h3>Jordan Lee</h3>
          <p>Grade 11 • Curious about design, technology, and leadership.</p>
        </div>
        <div className="chip-row">
          <span className="chip">Creative</span>
          <span className="chip">Analytical</span>
          <span className="chip">Collaborative</span>
        </div>
      </div>

      <div className="panel-grid">
        <article className="info-card">
          <h3>Interests</h3>
          <ul className="list-compact">
            <li>Product design</li>
            <li>Digital storytelling</li>
            <li>Community impact</li>
          </ul>
        </article>
        <article className="info-card">
          <h3>Achievements</h3>
          <ul className="list-compact">
            <li>Completed 3 learning modules</li>
            <li>Joined 2 peer challenges</li>
            <li>Built a portfolio draft</li>
          </ul>
        </article>
      </div>
    </Layout>
  );
}