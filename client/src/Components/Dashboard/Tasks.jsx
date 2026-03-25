import TaskEntry from "./TaskEntry";
import { v4 as uuidv4 } from "uuid";

function Tasks(props) {
  function markComplete(entry, id) {
    props.onStatusChangeEntry(entry);
    props.statusChange(id, "complete");
  }
  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <div className="task-list">
        {props.entries
          .filter(
            (entry) => entry.type === "task" && entry.status === "pending",
          )
          .map((entry) => (
            <TaskEntry
              key={entry.id}
              id={entry.id}
              content={entry.content}
              complete={markComplete}
            />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
