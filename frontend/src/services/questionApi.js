import assessmentQuestions from "../data/assessmentQuestions";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const QUESTIONS_URL = API_BASE_URL ? `${API_BASE_URL}/api/questions` : "/api/questions";

export async function getQuestions() {
  try {
    const response = await fetch(QUESTIONS_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();
    return data.questions || data.data || data;
  } catch (error) {
    console.warn("Unable to fetch questions from backend, using local fallback.", error);
    return assessmentQuestions;
  }
}
