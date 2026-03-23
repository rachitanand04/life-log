import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleLoginClick() {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => {
        console.log(res.status)
        if (res.status === 401) {
          navigate("/login"); // not logged in
        } else {
          navigate("/dashboard"); // already logged in
        }
      })
      .catch(() => navigate("/login"));
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