import EventEntry from "./EventEntry";
import { v4 as uuidv4 } from 'uuid';

function Events(props) {
  return (
    <div className="events">
      <h2>Events</h2>
      <div className="event-list">
        {props.entries
          .filter((entry) => entry.type === "event")
          .map((entry) => (
            <EventEntry key={uuidv4()} content={entry.content} />
          ))}
      </div>
    </div>
  );
}

export default Events;
