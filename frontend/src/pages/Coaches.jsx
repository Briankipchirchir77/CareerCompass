import Layout from "../components/Layout";

const coaches = [
  {
    name: "Maya Chen",
    role: "Career strategist",
    focus: "Helps students compare subject choices, personal strengths, and possible careers.",
    phone: "+254 711 245 880",
    email: "maya@careercompass.test",
    tags: ["IGCSE choices", "Confidence", "Planning"],
  },
  {
    name: "Daniel Okafor",
    role: "Design and portfolio mentor",
    focus: "Guides creative students through art, design, storytelling, and portfolio projects.",
    phone: "+254 722 318 640",
    email: "daniel@careercompass.test",
    tags: ["Art & Design", "Portfolio", "Media"],
  },
  {
    name: "Sofia Alvarez",
    role: "Tech coach",
    focus: "Supports students interested in coding, robotics, AI, data, and digital projects.",
    phone: "+254 733 902 114",
    email: "sofia@careercompass.test",
    tags: ["Computer Science", "AI", "Projects"],
  },
  {
    name: "Amina Patel",
    role: "Business and wellbeing coach",
    focus: "Connects business ideas with healthy study habits, communication, and leadership.",
    phone: "+254 744 610 552",
    email: "amina@careercompass.test",
    tags: ["Business", "Leadership", "Study habits"],
  },
];

export default function Coaches() {
  return (
    <Layout title="Coaches" subtitle="Meet mentors who can guide students with practical support, subject advice, and encouragement.">
      <div className="card-grid coaches-grid">
        {coaches.map((coach) => (
          <article key={coach.name} className="coach-card">
            <div className="coach-card-header">
              <div className="coach-avatar" aria-hidden="true">
                {coach.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div>
                <h3>{coach.name}</h3>
                <p className="eyebrow">{coach.role}</p>
              </div>
            </div>
            <p>{coach.focus}</p>
            <div className="chip-row">
              {coach.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
            <div className="coach-contact">
              <a href={`tel:${coach.phone.replace(/\s/g, "")}`}>{coach.phone}</a>
              <a href={`mailto:${coach.email}`}>{coach.email}</a>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}
