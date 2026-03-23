import TaskEntry from "./TaskEntry";

function Tasks(props) {
  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <div className="task-list">
        {props.entries
          .filter((entry) => entry.type === "task")
          .map((entry) => (
            <TaskEntry key={entry.id} content={entry.content} />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
