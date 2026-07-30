import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBrain, FaRoute, FaChartLine, FaGraduationCap, FaPalette, FaPuzzlePiece, FaBook, FaGlobe, FaLayerGroup } from "react-icons/fa";
import Layout from "../components/Layout";
import { UserContext } from "../context/userContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  const displayName = user?.name || "Explorer";

  const stats = [
    { label: "Readiness score", value: "82%", note: "Strong early alignment with creative problem-solving paths" },
    { label: "Curriculum links", value: "8 subjects", note: "CBC, Cambridge, and IGCSE subject ideas included" },
    { label: "Coach options", value: "4 mentors", note: "Choose support for STEM, arts, business, or confidence" },
  ];

  const milestones = [
    "Complete the career assessment",
    "Explore CBC, Cambridge, and IGCSE-friendly subjects",
    "Book a chat with a coach",
  ];

  const curriculumPaths = [
    { title: "STEM builder", subjects: "Mathematics, Physics, Computer Science", career: "Engineering, software, data" },
    { title: "Creative maker", subjects: "Art & Design, ICT, English", career: "Design, animation, product ideas" },
    { title: "Business explorer", subjects: "Business Studies, Economics, Mathematics", career: "Entrepreneurship, finance, marketing" },
  ];

  const curriculumSystems = [
    {
      title: "CBC",
      description: "Kenya's Competency-Based Curriculum, mapped from junior school through senior school pathways.",
      icon: <FaLayerGroup />,
      link: "/cbc",
      linkLabel: "Explore CBC",
    },
    {
      title: "Cambridge / IGCSE",
      description: "Subjects like Mathematics, Sciences, ICT, Business Studies, Global Perspectives, and Art & Design.",
      icon: <FaGraduationCap />,
      link: "/assessment",
      linkLabel: "Explore IGCSE paths",
    },
    {
      title: "British A Level",
      description: "Deep-dive subject specialization for students on the British A Level track.",
      icon: <FaBook />,
      link: "/assessment",
      linkLabel: "Explore A Level paths",
    },
    {
      title: "Mixed curriculum",
      description: "For students blending systems, or unsure yet which pathway fits best.",
      icon: <FaGlobe />,
      link: "/assessment",
      linkLabel: "Explore options",
    },
  ];

  return (
    <Layout title="Career Compass Home" subtitle={`Hi ${displayName}, choose a path to explore today.`}>
      <div className="dashboard-welcome-card">
        <div className="welcome-hero">
          <div>
            <p className="eyebrow">Start your journey</p>
            <h2>Discover subjects, strengths, and careers that fit you.</h2>
            <p>Use short activities, curriculum links, and coach guidance to turn interests into realistic next steps.</p>
            <div className="button-row">
              <Link className="btn-primary" to="/assessment">Start assessment</Link>
              <Link className="btn-secondary" to="/coaches">Meet coaches</Link>
            </div>
          </div>

          <div className="welcome-illustration">
            <div className="sprite-card sprite-rocket"><FaBrain /></div>
            <div className="sprite-card sprite-star"><FaPalette /></div>
            <div className="sprite-card sprite-book"><FaPuzzlePiece /></div>
          </div>
        </div>
      </div>

      <div className="stats-grid playful-grid">
        {stats.map((item) => (
          <article key={item.label} className="info-card playful-card">
            <p className="eyebrow">{item.label}</p>
            <h3>{item.value}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <section className="hero-panel hero-panel-soft">
        <div>
          <p className="eyebrow">Curriculum spotlight</p>
          <h3>Cambridge and IGCSE-aware pathway ideas</h3>
          <p>Subjects like Mathematics, Sciences, ICT, Business Studies, Global Perspectives, and Art & Design can connect school choices to future careers.</p>
          <div className="button-row">
            <Link className="btn-primary" to="/cbc">Explore CBC</Link>
            <Link className="btn-secondary" to="/assessment">Explore IGCSE paths</Link>
          </div>
        </div>

        <div className="hero-badge small-badge">
          <FaGraduationCap />
          <span>IGCSE-inspired learning</span>
        </div>
      </section>

      <div className="panel-header">
        <p className="eyebrow">Curriculum systems</p>
        <h3>Choose the curriculum that matches your school</h3>
      </div>

      <div className="card-grid curriculum-grid">
        {curriculumSystems.map((system) => (
          <article key={system.title} className="info-card curriculum-card">
            <div className="curriculum-icon">{system.icon}</div>
            <h3>{system.title}</h3>
            <p>{system.description}</p>
            <Link className="btn-secondary" to={system.link}>{system.linkLabel}</Link>
          </article>
        ))}
      </div>

      <div className="card-grid curriculum-grid">
        {curriculumPaths.map((path) => (
          <article key={path.title} className="info-card curriculum-card">
            <p className="eyebrow">{path.career}</p>
            <h3>{path.title}</h3>
            <p>{path.subjects}</p>
          </article>
        ))}
      </div>

      <div className="panel-grid">
        <article className="info-card">
          <h3>Growth steps</h3>
          <ul className="list-compact">
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="info-card">
          <h3>Quick links</h3>
          <div className="link-list">
            <Link to="/roadmap"><FaRoute /> Roadmap</Link>
            <Link to="/analytics"><FaChartLine /> Analytics</Link>
            <Link to="/coaches"><FaArrowRight /> Coaches</Link>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export default Dashboard;