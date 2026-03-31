import LogEntry from "./LogEntry";
import { v4 as uuidv4 } from "uuid";

function Log(props) {
  function deleteEntry(id) {
    props.delete(id);
  }
  function editEntry(id) {
    props.edit(id);
  }
  return (
    <div className="log-list">
      {props.entries.map(function (entry) {
        return (
          <LogEntry
            key={entry.id}
            id={entry.id}
            type={entry.type}
            content={entry.content}
            created={entry.time_created}
            delete={deleteEntry}
            edit={editEntry}
          />
        );
      })}
    </div>
  );
}

export default Log;
