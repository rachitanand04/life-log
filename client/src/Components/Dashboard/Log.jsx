import LogEntry from "./LogEntry";
import { v4 as uuidv4 } from 'uuid';

function Log(props) {
  return (
    <div className="log-list">
      {props.entries.map(function (entry) {
        return (
          <LogEntry key={uuidv4()} type={entry.type} content={entry.content} />
        );
      })}
    </div>
  );
}

export default Log;
