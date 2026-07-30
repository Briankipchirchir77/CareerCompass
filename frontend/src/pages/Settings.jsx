import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { ThemeContext } from "../context/theme";
import { getSettings, saveSettings } from "../services/localData";

export default function Settings() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [settings, setSettings] = useState(() => getSettings());

  function updateSetting(field, value) {
    const nextSettings = { ...settings, [field]: value };
    setSettings(nextSettings);
    saveSettings(nextSettings);
  }

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
            checked={settings.weeklyRecommendations}
            onChange={(event) => updateSetting("weeklyRecommendations", event.target.checked)}
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
            checked={settings.coachReminders}
            onChange={(event) => updateSetting("coachReminders", event.target.checked)}
            aria-label="Receive coach reminders"
          />
        </div>
        <div className="setting-item">
          <div>
            <h3>Parent summary</h3>
            <p>Prepare a short progress summary for parents or guardians.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.parentSummary}
            onChange={(event) => updateSetting("parentSummary", event.target.checked)}
            aria-label="Enable parent summary"
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
