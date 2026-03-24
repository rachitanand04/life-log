import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../Components/Dashboard/Navbar";
import Log from "../Components/Dashboard/Log";
import Tasks from "../Components/Dashboard/Tasks";
import Events from "../Components/Dashboard/Events";
import Input from "../Components/Dashboard/Input";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
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
      });

    fetch("http://localhost:3000/logs", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        console.log(logs);
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

  async function addEntry(newEntry) {
    try {
      const res = await fetch("http://localhost:3000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Error adding logs");
        return;
      }

      const data = await res.json();

      setLogs((prev) => [data, ...prev]);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteEntry(id) {
    try {
      const res = await fetch(`http://localhost:3000/logs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Error deleting log");
        return;
      }

      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dashboard">
      <Navbar user={user} logout={handleLogout} />
      <div className="dashboard-grid">
        <div className="log">
          <Input addEntry={addEntry} />
          <Log entries={logs} delete={deleteEntry} />
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
