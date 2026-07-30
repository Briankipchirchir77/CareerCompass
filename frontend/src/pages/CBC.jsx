import Layout from "../components/Layout";

export default function CBC() {
  return (
    <Layout title="CBC" subtitle="Explore how behavioural insight can help students make stronger career decisions.">
      <div className="panel-grid">
        <article className="info-card">
          <h3>What CBC supports</h3>
          <p>Career and Behaviour Change helps students reflect on their strengths, habits, and motivations in a calm, practical way.</p>
        </article>
        <article className="info-card">
          <h3>Key focus areas</h3>
          <ul className="list-compact">
            <li>Self-awareness</li>
            <li>Decision confidence</li>
            <li>Adaptive learning habits</li>
          </ul>
        </article>
      </div>
    </Layout>
  );
}