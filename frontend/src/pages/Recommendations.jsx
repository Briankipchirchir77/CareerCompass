import { Link, useSearchParams } from "react-router-dom";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import Layout from "../components/Layout";
import { getAssessmentResult, pathwayCatalog } from "../services/localData";

export default function Recommendations() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const assessment = getAssessmentResult();
  const careers = assessment?.recommendations || pathwayCatalog.map((pathway, index) => ({
    ...pathway,
    match: `${92 - index * 4}% match`,
  }));
  const filteredCareers = query
    ? careers.filter((career) => `${career.title} ${career.summary} ${career.skills.join(" ")} ${career.subjects.join(" ")} ${career.careers.join(" ")}`.toLowerCase().includes(query))
    : careers;

  return (
    <Layout title="Recommendations" subtitle="These pathways reflect your interests, strengths, and academic profile.">
      {query ? <p className="search-results">Showing pathways related to “{searchParams.get("q")}”.</p> : null}
      {!assessment ? (
        <div className="info-card">
          <h3>Take the assessment for better matches</h3>
          <p>These are starter pathways. Once you complete the assessment, this page will reorder them around your answers.</p>
          <Link className="text-link" to="/assessment">Start assessment <FaArrowRight /></Link>
        </div>
      ) : null}
      <div className="card-grid">
        {filteredCareers.map((career) => (
          <article key={career.title} className="info-card">
            <p className="eyebrow">{career.match}</p>
            <h3>{career.title}</h3>
            <p>{career.summary}</p>

            <div className="pathway-careers">
              <p className="pathway-careers-label"><FaBriefcase /> Real careers in this pathway</p>
              <ul className="pathway-careers-list">
                {career.careers.map((jobTitle) => (
                  <li key={jobTitle}>{jobTitle}</li>
                ))}
              </ul>
            </div>

            <div className="chip-row">
              {[...career.skills, ...career.subjects.slice(0, 2)].map((skill) => (
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