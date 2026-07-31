import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCompass, FaRocket, FaPalette, FaChartLine, FaLightbulb } from "react-icons/fa";
import { UserContext } from "../context/userContext";

const sampleWelcome = [
  "Let's explore your future!",
  "Choose what feels exciting.",
  "Career discovery starts here.",
];

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcomePhrase] = useState(() => sampleWelcome[Math.floor(Math.random() * sampleWelcome.length)]);
  const { setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const name = isRegisterMode ? form.name.value.trim() : "";

    const endpoint = isRegisterMode ? "/api/auth/register" : "/api/auth/login";
    const body = isRegisterMode ? { name, email, password } : { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("careercompass-token", data.access_token);
      setUser(data.student);
      navigate("/dashboard");
    } catch (err) {
      setMessage("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page auth-page-split">
      <motion.div
        className="auth-brand-panel"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-brand-content">
          <div className="auth-logo">
            <span className="auth-logo-icon"><FaCompass /></span>
            <span className="auth-logo-text">CareerCompass</span>
          </div>

          <h1>Find the path that actually fits you.</h1>
          <p>
            Fun activities, real curriculum links, and friendly coaches — all in one
            place to help you figure out what's next.
          </p>

          <div className="auth-sprites">
            <motion.div
              className="sprite-card sprite-rocket"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaRocket />
            </motion.div>
            <motion.div
              className="sprite-card sprite-star"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <FaPalette />
            </motion.div>
            <motion.div
              className="sprite-card sprite-book"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <FaLightbulb />
            </motion.div>
          </div>

          <div className="auth-trust-row">
            <FaChartLine />
            <span>Backed by CBC, Cambridge/IGCSE, and A Level pathway data</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="auth-form-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <div className="auth-card auth-card-playful">
          <div className="auth-header">
            <span className="auth-chip">
              {isRegisterMode ? "New here? Start your journey" : "Welcome back"}
            </span>
            <h1>{isRegisterMode ? "Create your account" : "Log in to CareerCompass"}</h1>
            <p>{welcomePhrase}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Choose login or create account">
            <button
              type="button"
              role="tab"
              aria-selected={!isRegisterMode}
              className={`auth-tab${!isRegisterMode ? " active" : ""}`}
              onClick={() => setIsRegisterMode(false)}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isRegisterMode}
              className={`auth-tab${isRegisterMode ? " active" : ""}`}
              onClick={() => setIsRegisterMode(true)}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {isRegisterMode && (
              <>
                <label className="sr-only" htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
              </>
            )}
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="Email address" autoComplete="email" required />
            <label className="sr-only" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete={isRegisterMode ? "new-password" : "current-password"} required />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Please wait..." : isRegisterMode ? "Create account" : "Enter your adventure"}
            </button>
          </form>

          <div className="auth-links">
            <button type="button" className="text-button" onClick={() => setMessage("Password recovery is coming soon.")}>Forgot password?</button>
            <button type="button" className="text-button" onClick={() => setIsRegisterMode(!isRegisterMode)}>
              {isRegisterMode ? "Already have an account? Log in" : "Create an account"}
            </button>
          </div>
          {message ? <p className="form-message" role="status">{message}</p> : null}
        </div>
      </motion.div>
    </div>
  );
}

export default Login;