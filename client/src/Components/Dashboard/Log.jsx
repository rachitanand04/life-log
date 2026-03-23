import LogEntry from "./LogEntry";

function Log(props) {
  return (
    <div className="log">
      <div className="log-list">
        {props.entries.map(function (entry) {
          return (
            <LogEntry
              key={entry.id}
              type={entry.type}
              content={entry.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Log;
