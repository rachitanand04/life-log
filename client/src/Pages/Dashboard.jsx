import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../Components/Dashboard/Navbar";
import Log from "../Components/Dashboard/Log";
import Tasks from "../Components/Dashboard/Tasks";
import Events from "../Components/Dashboard/Events";
import entries from "./entry-test";

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

  function handleLogout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        navigate("/login"); // or "/"
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="dashboard">
      <Navbar user={user} logout={handleLogout} />
      <div className="dashboard-grid">
        <Log entries={entries}/>
        <div className="task-events">
          <Tasks entries={entries}/>
          <Events entries={entries}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
