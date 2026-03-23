import LogEntry from "./LogEntry";

function Log(props) {
  return (
    <div className="log">
      {props.entries.map(function (entry) {
        return <LogEntry key={entry.id} type={entry.type} content={entry.content} />
      })}
    </div>
  );
}

export default Log;
