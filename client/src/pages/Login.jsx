import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { API_BASE } from "../api/config";
import "../styles/login.css";

function Login() {

  const [isRegister, setIsRegister] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
      .then(() => setParticlesReady(true));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Authentication failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user.username);

      navigate("/dashboard");
    } catch {
      setError("Cannot reach server. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Particles Background */}

      {particlesReady && (
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },

          fpsLimit: 60,

          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },

              resize: true,
            },

            modes: {
              repulse: {
                distance: 120,
                duration: 0.4,
              },
            },
          },

          particles: {
            color: {
              value: "#b08968",
            },

            links: {
              color: "#c8a27a",

              distance: 150,

              enable: true,

              opacity: 0.3,

              width: 1,
            },

            move: {
              direction: "none",

              enable: true,

              outModes: {
                default: "bounce",
              },

              speed: 2,
            },

            number: {
              value: 70,
            },

            opacity: {
              value: 0.5,
            },

            size: {
              value: { min: 1, max: 5 },
            },
          },

          detectRetina: true,
        }}
      />
      )}

      {/* Login Container */}

      <div className="login-container">

        <div className="login-box">

          <h1>
            {isRegister
              ? "Create Account"
              : "Welcome Back"}
          </h1>

          <p>
            {isRegister
              ? "Register to continue"
              : "Login to manage your expenses"}
          </p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Register"
                  : "Login"}
            </button>

          </form>

          <div className="toggle-text">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
            >
              {isRegister
                ? " Sign In"
                : " Register"}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;