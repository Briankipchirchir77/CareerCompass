import Layout from "../components/Layout";
import { getAssessmentResult, getBookings } from "../services/localData";

const roadmap = [
  { phase: "Phase 1", title: "Foundation building", detail: "Strengthen communication, digital literacy, and core project work." },
  { phase: "Phase 2", title: "Skill specialization", detail: "Begin focused work in design, analytics, AI tools, or media production." },
  { phase: "Phase 3", title: "Real-world exposure", detail: "Join workshops, internships, or portfolio projects to build confidence." },
];

export default function Roadmap() {
  const assessment = getAssessmentResult();
  const bookings = getBookings();
  const pathway = assessment?.topPathway;
  const dynamicRoadmap = pathway
    ? [
        { phase: "Step 1", title: `Explore ${pathway.title}`, detail: `Review careers like ${pathway.careers.join(", ")} and note what feels most interesting.` },
        { phase: "Step 2", title: "Choose subject foundations", detail: `Prioritise ${pathway.subjects.slice(0, 3).join(", ")} while keeping your school workload balanced.` },
        { phase: "Step 3", title: "Build proof", detail: `Create a small project using ${pathway.skills.slice(0, 2).join(" and ")} before your next coach session.` },
      ]
    : roadmap;

  return (
    <Layout title="Roadmap" subtitle="A practical roadmap to turn your interests into measurable progress.">
      <div className="timeline">
        {dynamicRoadmap.map((item) => (
          <div key={item.phase} className="timeline-item">
            <div className="timeline-marker">{item.phase}</div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      {bookings.length ? (
        <div className="info-card">
          <h3>Coach follow-up</h3>
          <p>Your next requested session is with {bookings[0].coach} about {bookings[0].topic}.</p>
        </div>
      ) : null}
    </Layout>
  );
}
