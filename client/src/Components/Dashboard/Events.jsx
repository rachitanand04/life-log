import EventEntry from "./EventEntry";

function Events(props) {
  return (
    <div className="events">
      <h2>Events</h2>
      <div className="event-list">
        {props.entries
          .filter((entry) => entry.type === "event")
          .map((entry) => (
            <EventEntry key={entry.id} content={entry.content} />
          ))}
      </div>
    </div>
  );
}

export default Events;
