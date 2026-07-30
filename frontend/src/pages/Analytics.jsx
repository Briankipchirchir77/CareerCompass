import Layout from "../components/Layout";
import { getAssessmentResult, getBookings, getProfile } from "../services/localData";

export default function Analytics() {
  const assessment = getAssessmentResult();
  const bookings = getBookings();
  const profile = getProfile();
  const readiness = assessment ? 82 : 38;
  const skillDevelopment = Math.min(90, 44 + (profile.interests?.length || 0) * 8 + bookings.length * 6);
  const activeArea = assessment?.topPathway?.title || "Career discovery";
  const nextFocus = assessment?.topPathway?.skills?.[0] || "Complete the assessment";

  return (
    <Layout title="Analytics" subtitle="Track your momentum, focus areas, and growth over time.">
      <div className="stats-grid">
        <article className="info-card">
          <p className="eyebrow">Profile readiness</p>
          <h3>{readiness}%</h3>
          <p>{assessment ? "Assessment complete and ready for pathway planning." : "Complete the assessment to improve this score."}</p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Most active area</p>
          <h3>{activeArea}</h3>
          <p>Your dashboard, roadmap, and coach prompts now use this focus area.</p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Next focus</p>
          <h3>{nextFocus}</h3>
          <p>{bookings.length ? "Use your booked coach session to make this practical." : "Book a coach session when you are ready for feedback."}</p>
        </article>
      </div>

      <div className="info-card">
        <h3>Progress snapshot</h3>
        <div className="progress-group">
          <div className="progress-label">
            <span>Career readiness</span>
            <strong>{readiness}%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${readiness}%` }} />
          </div>
        </div>
        <div className="progress-group">
          <div className="progress-label">
            <span>Skill development</span>
            <strong>{skillDevelopment}%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${skillDevelopment}%` }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
