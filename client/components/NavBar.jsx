import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ color: "white", marginRight: "15px" }}>
        Home
      </Link>

      {user ? (
        <>
          <Link to="/create-project" style={{ color: "white", marginRight: "15px" }}>
            Create Project
          </Link>

          <span style={{ marginRight: "10px" }}>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ color: "white" }}>
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
