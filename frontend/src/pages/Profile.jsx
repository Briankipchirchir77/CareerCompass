import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context/userContext";
import { getAssessmentResult, getProfile, saveProfile } from "../services/localData";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const assessment = getAssessmentResult();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(() => ({
    name: user?.name || "Explorer",
    email: user?.email || "",
    ...getProfile(),
  }));

  function handleChange(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveProfile(profile);
    setUser({ name: profile.name || "Explorer", email: profile.email });
    setSaved(true);
  }

  const topPathway = assessment?.topPathway?.title || "Not assessed yet";
  const interests = profile.interests.length ? profile.interests : ["Career discovery"];

  return (
    <Layout title="Profile" subtitle="Your profile is shaping a personalised and supportive plan.">
      <div className="profile-card">
        <div>
          <p className="eyebrow">Student profile</p>
          <h3>{profile.name || "Explorer"}</h3>
          <p>{profile.grade} • {profile.curriculum} • Top pathway: {topPathway}</p>
        </div>
        <div className="chip-row">
          {interests.map((interest) => (
            <span key={interest} className="chip">{interest}</span>
          ))}
        </div>
      </div>

      <div className="panel-grid">
        <form className="info-card profile-form" onSubmit={handleSubmit}>
          <h3>Edit profile</h3>
          <label>
            Name
            <input value={profile.name} onChange={(event) => handleChange("name", event.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={profile.email} onChange={(event) => handleChange("email", event.target.value)} />
          </label>
          <label>
            Grade
            <select value={profile.grade} onChange={(event) => handleChange("grade", event.target.value)}>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
              <option>IGCSE Year 1</option>
              <option>IGCSE Year 2</option>
              <option>AS Level</option>
              <option>A Level</option>
            </select>
          </label>
          <label>
            Curriculum
            <select value={profile.curriculum} onChange={(event) => handleChange("curriculum", event.target.value)}>
              <option>CBC</option>
              <option>Cambridge / IGCSE</option>
              <option>British A Level</option>
              <option>Mixed curriculum</option>
            </select>
          </label>
          <label>
            Interests
            <input value={profile.interests.join(", ")} onChange={(event) => handleChange("interests", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
          </label>
          <label>
            Career goal
            <textarea value={profile.goal} onChange={(event) => handleChange("goal", event.target.value)} />
          </label>
          <button className="btn-primary" type="submit">Save profile</button>
          {saved ? <p className="success-text">Profile saved.</p> : null}
        </form>

        <article className="info-card">
          <h3>Progress summary</h3>
          <ul className="list-compact">
            <li>Assessment: {assessment ? "Completed" : "Not completed yet"}</li>
            <li>Current goal: {profile.goal}</li>
            <li>Suggested pathway: {topPathway}</li>
          </ul>
        </article>
      </div>
    </Layout>
  );
}
