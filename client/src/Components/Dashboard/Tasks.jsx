import TaskEntry from "./TaskEntry";
import { v4 as uuidv4 } from 'uuid';

function Tasks(props) {
  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <div className="task-list">
        {props.entries
          .filter((entry) => entry.type === "task" && entry.status === "pending")
          .map((entry) => (
            <TaskEntry key={entry.id} content={entry.content} />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
