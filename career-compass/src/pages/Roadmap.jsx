import Layout from "../components/Layout";

const roadmap = [
  { phase: "Phase 1", title: "Foundation building", detail: "Strengthen communication, digital literacy, and core project work." },
  { phase: "Phase 2", title: "Skill specialization", detail: "Begin focused work in design, analytics, AI tools, or media production." },
  { phase: "Phase 3", title: "Real-world exposure", detail: "Join workshops, internships, or portfolio projects to build confidence." },
];

export default function Roadmap() {
  return (
    <Layout title="Roadmap" subtitle="A practical roadmap to turn your interests into measurable progress.">
      <div className="timeline">
        {roadmap.map((item) => (
          <div key={item.phase} className="timeline-item">
            <div className="timeline-marker">{item.phase}</div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}