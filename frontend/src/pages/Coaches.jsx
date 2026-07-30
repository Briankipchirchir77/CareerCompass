import Layout from "../components/Layout";

const coaches = [
  { name: "Maya Chen", role: "Career strategist", focus: "Career clarity and interviews" },
  { name: "Daniel Okafor", role: "Design mentor", focus: "Portfolio building and storytelling" },
  { name: "Sofia Alvarez", role: "Tech coach", focus: "Project planning and growth" },
];

export default function Coaches() {
  return (
    <Layout title="Coaches" subtitle="Meet the mentors who can guide you with practical support and encouragement.">
      <div className="card-grid">
        {coaches.map((coach) => (
          <article key={coach.name} className="info-card">
            <h3>{coach.name}</h3>
            <p className="eyebrow">{coach.role}</p>
            <p>{coach.focus}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
}