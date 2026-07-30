const KEYS = {
  assessment: "careercompass-assessment",
  bookings: "careercompass-bookings",
  profile: "careercompass-profile",
  settings: "careercompass-settings",
};

export const pathwayCatalog = [
  {
    id: "technology",
    title: "Technology Explorer",
    careers: ["Software Developer", "AI Product Designer", "Cybersecurity Analyst"],
    subjects: ["Mathematics", "Computer Science", "ICT", "Physics"],
    skills: ["Problem solving", "Coding basics", "Digital projects"],
    summary: "Best for students who enjoy building, testing ideas, and solving practical problems with digital tools.",
  },
  {
    id: "creative",
    title: "Creative Designer",
    careers: ["UX Designer", "Animator", "Content Creator"],
    subjects: ["Art & Design", "English", "ICT", "Global Perspectives"],
    skills: ["Storytelling", "Visual thinking", "Portfolio projects"],
    summary: "Best for students who enjoy making visual work, explaining ideas, and creating experiences for people.",
  },
  {
    id: "analytical",
    title: "Data and Business Analyst",
    careers: ["Data Analyst", "Economist", "Business Strategist"],
    subjects: ["Mathematics", "Business Studies", "Economics", "Computer Science"],
    skills: ["Research", "Spreadsheets", "Decision making"],
    summary: "Best for students who enjoy patterns, numbers, research, and using evidence to make choices.",
  },
  {
    id: "leadership",
    title: "Leadership and Enterprise",
    careers: ["Entrepreneur", "Project Manager", "Marketing Strategist"],
    subjects: ["Business Studies", "English", "Global Perspectives", "Economics"],
    skills: ["Communication", "Teamwork", "Planning"],
    summary: "Best for students who enjoy organising people, presenting ideas, and turning plans into action.",
  },
];

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAssessmentResult() {
  return readJson(KEYS.assessment, null);
}

export function saveAssessmentResult(result) {
  writeJson(KEYS.assessment, result);
}

export function getBookings() {
  return readJson(KEYS.bookings, []);
}

export function saveBooking(booking) {
  const bookings = getBookings();
  const nextBookings = [booking, ...bookings].slice(0, 8);
  writeJson(KEYS.bookings, nextBookings);
  return nextBookings;
}

export function getProfile() {
  return readJson(KEYS.profile, {
    grade: "Grade 10",
    school: "",
    curriculum: "Cambridge / IGCSE",
    goal: "Explore careers that match my strengths.",
    interests: ["Technology", "Design", "Business"],
  });
}

export function saveProfile(profile) {
  writeJson(KEYS.profile, profile);
}

export function getSettings() {
  return readJson(KEYS.settings, {
    weeklyRecommendations: true,
    coachReminders: true,
    parentSummary: false,
  });
}

export function saveSettings(settings) {
  writeJson(KEYS.settings, settings);
}

export function scoreAssessment(answers) {
  const scores = {
    technology: 0,
    creative: 0,
    analytical: 0,
    leadership: 0,
  };

  const weights = [3, 2, 1, 0, 0];
  const answerOrder = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

  answers.forEach((entry, index) => {
    const value = weights[answerOrder.indexOf(entry.answer)] ?? 1;
    const keys = ["technology", "creative", "analytical", "leadership", "technology"];
    scores[keys[index % keys.length]] += value;
  });

  const ranked = pathwayCatalog
    .map((pathway) => ({
      ...pathway,
      score: scores[pathway.id] || 0,
      match: `${Math.max(68, Math.min(96, 72 + (scores[pathway.id] || 0) * 7))}% match`,
    }))
    .sort((a, b) => b.score - a.score);

  return {
    completedAt: new Date().toISOString(),
    answers,
    topPathway: ranked[0],
    recommendations: ranked,
  };
}
