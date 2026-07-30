import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { ThemeContext } from "../context/theme";

export default function Settings() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [weeklyRecommendations, setWeeklyRecommendations] = useState(true);
  const [coachReminders, setCoachReminders] = useState(true);

  return (
    <Layout title="Settings" subtitle="Control how you receive updates and manage your learning experience.">
      <div className="info-card settings-list">
        <div className="setting-item">
          <div>
            <h3>Weekly recommendations</h3>
            <p>Receive curated suggestions every week.</p>
          </div>
          <input
            type="checkbox"
            checked={weeklyRecommendations}
            onChange={(event) => setWeeklyRecommendations(event.target.checked)}
            aria-label="Receive weekly recommendations"
          />
        </div>
        <div className="setting-item">
          <div>
            <h3>Coach reminders</h3>
            <p>Get nudges before your sessions.</p>
          </div>
          <input
            type="checkbox"
            checked={coachReminders}
            onChange={(event) => setCoachReminders(event.target.checked)}
            aria-label="Receive coach reminders"
          />
        </div>
        <div className="setting-item">
          <div>
            <h3>Dark mode</h3>
            <p>Switch to a darker visual theme.</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            aria-label="Enable dark mode"
          />
        </div>
      </div>
    </Layout>
  );
}
