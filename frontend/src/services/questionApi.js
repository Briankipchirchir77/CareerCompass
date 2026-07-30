import assessmentQuestions from "../data/assessmentQuestions";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export async function getQuestions() {
  // The app works out of the box with the bundled assessment. Set VITE_API_URL
  // only when a deployed API should supply questions instead.
  if (!API_BASE_URL) {
    return assessmentQuestions;
  }

  const response = await fetch(`${API_BASE_URL}/api/questions`);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return await response.json();
}
