import { Link, useSearchParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Layout from "../components/Layout";

const careers = [
  {
    title: "AI Product Designer",
    match: "94% match",
    summary: "Best for students who enjoy solving problems creatively and shaping user experiences.",
    skills: ["UX research", "Prototyping", "Design systems"],
  },
  {
    title: "Data Analyst",
    match: "90% match",
    summary: "A strong fit if you like patterns, strategy, and translating data into action.",
    skills: ["Excel", "SQL", "Visualization"],
  },
  {
    title: "Digital Marketing Strategist",
    match: "88% match",
    summary: "Great for storytellers who enjoy campaigns, audience insights, and growth.",
    skills: ["Content planning", "Analytics", "Brand storytelling"],
  },
];

export default function Recommendations() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const filteredCareers = query
    ? careers.filter((career) => `${career.title} ${career.summary} ${career.skills.join(" ")}`.toLowerCase().includes(query))
    : careers;

  return (
    <Layout title="Recommendations" subtitle="These pathways reflect your interests, strengths, and academic profile.">
      {query ? <p className="search-results">Showing pathways related to “{searchParams.get("q")}”.</p> : null}
      <div className="card-grid">
        {filteredCareers.map((career) => (
          <article key={career.title} className="info-card">
            <p className="eyebrow">{career.match}</p>
            <h3>{career.title}</h3>
            <p>{career.summary}</p>
            <div className="chip-row">
              {career.skills.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>
            <Link className="text-link" to="/roadmap">
              Explore roadmap <FaArrowRight />
            </Link>
          </article>
        ))}
      </div>
      {filteredCareers.length === 0 ? <div className="info-card centered"><h3>No matching pathways yet</h3><p>Try a broader career or skill term.</p></div> : null}
    </Layout>
  );
}
