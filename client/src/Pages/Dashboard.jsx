import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../Components/Dashboard/Navbar";
import Log from "../Components/Dashboard/Log";
import Tasks from "../Components/Dashboard/Tasks";
import Events from "../Components/Dashboard/Events";
import Input from "../Components/Dashboard/Input";
import EditModal from "../Components/Dashboard/EditModal";
import {
  dashboard,
  logsFetch,
  addEntryCall,
  deleteEntryCall,
  updateStatus,
} from "../API/dashboard";
import { logout } from "../API/auth";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editEntry, setEditEntry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dashboard().then((data) => {
      setUser(data.user);
    });

    logsFetch()
      .then((data) => {
        setLogs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogout() {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  function addEntry(newEntry) {
    addEntryCall(newEntry)
      .then((data) => {
        setLogs((prev) => [data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteEntry(id) {
    deleteEntryCall(id)
      .then(() => {
        setLogs((prev) => prev.filter((log) => log.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function changeStatus(id, newStatus) {
    updateStatus(id, { status: newStatus })
      .then(() => {
        setLogs((prev) =>
          prev.map((log) =>
            log.id === id ? { ...log, status: newStatus } : log,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openModal(id) {
    const entry = logs.find((log) => {
      return log.id === id;
    });
    setEditing(true);
    setEditEntry(entry);
  }

  function closeModal() {
    setEditing(false);
  }

  return (
    <div className="dashboard">
      <Navbar user={user} logout={handleLogout} />
      <div className="dashboard-grid">
        <div className="log">
          <Input addEntry={addEntry} />
          {/* <DateSelector /> */}
          <Log entries={logs} delete={deleteEntry} edit={openModal} />
        </div>
        <div className="task-events">
          <Tasks
            entries={logs}
            onStatusChangeEntry={addEntry}
            statusChange={changeStatus}
          />
          <Events
            entries={logs}
            onStatusChangeEntry={addEntry}
            statusChange={changeStatus}
          />
        </div>
      </div>
      {isEditing && <EditModal entry={editEntry} close={closeModal} />}
    </div>
  );
}

export default Dashboard;
