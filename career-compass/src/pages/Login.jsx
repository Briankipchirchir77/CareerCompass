import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>CareerCompass</h1>
        <p>Sign in to explore your future with confidence.</p>

        <form onSubmit={handleLogin}>
          <label className="sr-only" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="Email address" autoComplete="email" required />
          <label className="sr-only" htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" autoComplete="current-password" required />
          <button type="submit">Login</button>
        </form>

        <div className="auth-links">
          <button type="button" className="text-button" onClick={() => setMessage("Password recovery will be available when accounts are connected.")}>Forgot password?</button>
          <button type="button" className="text-button" onClick={() => setMessage("Account creation will be available when accounts are connected.")}>Create an account</button>
        </div>
        {message ? <p className="form-message" role="status">{message}</p> : null}
      </div>
    </div>
  );
}

export default Login;
