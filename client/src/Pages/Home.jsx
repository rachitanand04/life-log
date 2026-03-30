import "./Home.css";
import { useNavigate } from "react-router-dom";
import { me } from "../API/auth"

function Home() {
  const navigate = useNavigate();

  function handleLoginClick() {
    me()
    .then(()=>{
      navigate("/dashboard");
    })
    .catch(()=>{
      navigate("/login");
    })
  }

  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <div className="home">
      <h1>Life Logger</h1>
      <div className="buttons">
        <button id="login" onClick={handleLoginClick}>
          Login
        </button>

        <button id="sign-up" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;