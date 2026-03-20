import { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Life Logger</h1>
      <div className="buttons">
        <Link to="/login">
          <button id="login">Login</button>
        </Link>
        <Link to="/signup">
          <button id="sign-up">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
