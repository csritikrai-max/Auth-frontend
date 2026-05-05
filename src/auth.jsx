import { useState } from "react";
import { Toaster, toast } from "sonner";

const API_BASE = "http://localhost:4000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Mono', monospace;
    background: #0e0e0e;
    min-height: 100vh;
  }

  .auth-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0e0e0e;
    position: relative;
    overflow: hidden;
  }

  .auth-wrapper::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    pointer-events: none;
  }

  .auth-wrapper::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
    bottom: -50px;
    left: -50px;
    pointer-events: none;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    padding: 48px 40px;
    background: #161616;
    border: 1px solid #2a2a2a;
    border-radius: 16px;
    position: relative;
    z-index: 1;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: #c9a96e;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .auth-tagline {
    font-size: 0.72rem;
    color: #555;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 36px;
  }

  .auth-tabs {
    display: flex;
    margin-bottom: 32px;
    border-bottom: 1px solid #2a2a2a;
  }

  .auth-tab {
    flex: 1;
    background: none;
    border: none;
    padding: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    color: #555;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .auth-tab.active {
    color: #c9a96e;
    border-bottom-color: #c9a96e;
  }

  .auth-tab:hover:not(.active) { color: #888; }

  .form-group { margin-bottom: 16px; }

  .form-label {
    display: block;
    font-size: 0.7rem;
    color: #666;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .form-input {
    width: 100%;
    background: #1e1e1e;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 12px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: #e8e8e8;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-input::placeholder { color: #444; }
  .form-input:focus { border-color: #c9a96e; }

  .btn-auth {
    width: 100%;
    padding: 13px;
    margin-top: 8px;
    background: #c9a96e;
    color: #0e0e0e;
    border: none;
    border-radius: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .btn-auth:hover { background: #d4b87e; transform: translateY(-1px); }
  .btn-auth:active { transform: translateY(0); }
  .btn-auth:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .auth-divider {
    text-align: center;
    font-size: 0.7rem;
    color: #444;
    margin: 20px 0 0;
    letter-spacing: 0.5px;
  }

  .auth-divider span {
    color: #c9a96e;
    cursor: pointer;
    text-decoration: underline;
  }

  .auth-divider span:hover { color: #d4b87e; }
`;

function Auth({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function switchTab(t) {
    setTab(t);
    setEmail("");
    setPassword("");
  }

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = tab === "login"
        ? `${API_BASE}/login`
        : `${API_BASE}/register`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      if (tab === "signup") {
        toast.success("Account created! Please login.");
        switchTab("login");
      } else {
        toast.success("Welcome back! 👋");
        localStorage.setItem("token", data.ACCESS_token);
        setTimeout(() => {
          if (onLogin) onLogin(data.ACCESS_token);
        }, 800);
      }

    } catch {
      toast.error("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <>
      <style>{styles}</style>
      <Toaster
        position="top-center"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            fontFamily: "DM Mono, monospace",
            fontSize: "0.82rem",
          },
          duration: 3000,
        }}
      />
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo">Notes.</div>
          <div className="auth-tagline">Your thoughts, organized</div>
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => switchTab("login")}
            >
              Login
            </button>
            <button
              className={`auth-tab ${tab === "signup" ? "active" : ""}`}
              onClick={() => switchTab("signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="btn-auth"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please wait..." : tab === "login" ? "Login" : "Create Account"}
          </button>
          <div className="auth-divider">
            {tab === "login" ? (
              <>Don't have an account?{" "}
                <span onClick={() => switchTab("signup")}>Sign up</span>
              </>
            ) : (
              <>Already have an account?{" "}
                <span onClick={() => switchTab("login")}>Login</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;