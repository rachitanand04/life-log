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
          .sort((a, b) => {
            if (!a.due_date) return 1;
            if (!b.due_date) return -1;
            return new Date(a.due_date) - new Date(b.due_date);
          })
          .map((entry) => (
            <EventEntry
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

export default Events;
