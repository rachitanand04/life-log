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
        <button id="sign-up">Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
