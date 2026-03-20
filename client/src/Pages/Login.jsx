import "./Login.css";
import LoginForm from "../Components/LoginForm";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <Link to="/">
        <button className="home-button">
          <FaHome className="home-icon" />
        </button>
      </Link>
      <div className="login">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
