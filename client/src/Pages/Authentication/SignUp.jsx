import "./SignUp.css";
import SignupForm from "../../Components/Authentication/SignUpForm";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <Link to="/">
        <button className="home-button">
          <FaHome className="home-icon" />
        </button>
      </Link>

      <div className="signup">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUp;
