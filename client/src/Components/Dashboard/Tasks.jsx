import TaskEntry from "./TaskEntry";

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
          .sort((a, b) => {
            if (!a.due_date) return 1;
            if (!b.due_date) return -1;
            return new Date(a.due_date) - new Date(b.due_date);
          })
          .map((entry) => (
            <TaskEntry
              key={entry.id}
              id={entry.id}
              due_date={entry.due_date}
              content={entry.content}
              complete={markComplete}
            />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
