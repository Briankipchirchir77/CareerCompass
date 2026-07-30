import Layout from "../components/Layout";

export default function CBC() {
  return (
    <Layout title="CBC and Cambridge Pathways" subtitle="Explore how Kenyan CBC strengths and Cambridge or IGCSE subject choices can support stronger career decisions.">
      <div className="panel-grid">
        <article className="info-card">
          <h3>CBC strengths</h3>
          <p>Students can reflect on communication, creativity, critical thinking, collaboration, digital literacy, and citizenship.</p>
        </article>
        <article className="info-card">
          <h3>IGCSE subject links</h3>
          <ul className="list-compact">
            <li>Mathematics and Sciences for STEM pathways</li>
            <li>ICT or Computer Science for digital careers</li>
            <li>Business Studies and Economics for enterprise</li>
            <li>Art & Design, English, and Global Perspectives for creative careers</li>
          </ul>
        </article>
        <article className="info-card">
          <h3>How to use this</h3>
          <p>Compare school subjects with interests from the assessment, then book a coach to turn the match into a study plan.</p>
        </article>
      </div>
    </Layout>
  );
}
