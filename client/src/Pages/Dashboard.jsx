import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/dashboard", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login"); // not logged in → go back
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome {user.email}</p>}
    </div>
  );
}

export default Dashboard;