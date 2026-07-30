
import Layout from "../components/Layout";

export default function ParentPortal() {
  return (
    <Layout title="Parent Portal" subtitle="Stay connected with your child’s growth and upcoming milestones.">
      <div className="panel-grid">
        <article className="info-card">
          <h3>Latest update</h3>
          <p>Your child has completed the latest reflection activity and is showing strong engagement with creative pathways.</p>
        </article>
        <article className="info-card">
          <h3>Suggested next step</h3>
          <p>Book a short conversation with their coach and review the roadmap together.</p>
        </article>
      </div>
    </Layout>
  );
}