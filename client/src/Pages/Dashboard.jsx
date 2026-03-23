import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../Components/Dashboard/Navbar";
import Log from "../Components/Dashboard/Log";
import Tasks from "../Components/Dashboard/Tasks";
import Events from "../Components/Dashboard/Events";
import Input from "../Components/Dashboard/Input";
import entries from "./entry-test";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState(entries);
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

  function addEntry(newEntry){
    setLogs((prev)=>{
      return [...prev,newEntry]
    })
  }

  return (
    <div className="dashboard">
      <Navbar user={user} logout={handleLogout} />
      <div className="dashboard-grid">
        <div className="log">
          <Input addEntry={addEntry} />
          <Log entries={logs} />
        </div>
        <div className="task-events">
          <Tasks entries={logs} />
          <Events entries={logs} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
