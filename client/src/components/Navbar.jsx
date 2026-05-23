import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Welcome, {user}</h2>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;