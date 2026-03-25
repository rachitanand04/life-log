import EventEntry from "./EventEntry";
import { v4 as uuidv4 } from "uuid";

function Events(props) {
  function markComplete(entry, id) {
    props.onStatusChangeEntry(entry);
    props.statusChange(id, "complete");
  }
  return (
    <div className="events">
      <h2>Events</h2>
      <div className="event-list">
        {props.entries
          .filter(
            (entry) => entry.type === "event" && entry.status === "pending",
          )
          .map((entry) => (
            <EventEntry
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

export default Events;
