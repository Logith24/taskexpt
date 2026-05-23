import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import "../styles/login.css";

function Login() {

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("user", username);

    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      {/* Particles Background */}

      <Particles
        id="tsparticles"
        init={particlesInit}
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

            <button type="submit">
              {isRegister
                ? "Register"
                : "Login"}
            </button>

          </form>

          <div className="toggle-text">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() =>
                setIsRegister(!isRegister)
              }
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