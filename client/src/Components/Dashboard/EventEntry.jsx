import { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { formatDate } from "../../utils/time";

function EventEntry(props) {
  const [isDone, toggleDone] = useState(false);

  function ToggleCheckbox(event) {
    toggleDone(!isDone);
    markComplete();
    event.preventDefault();
  }

  function markComplete() {
    const statusChange = {
      type: "complete",
      content: `Event (${props.content}) marked as complete`,
    };
    props.complete(statusChange, props.id);
  }
  return (
    <div className="event-entry">
      <button className="checkbox" onClick={ToggleCheckbox}>
        {isDone ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </button>
      <p>{props.content}</p>
      <span className="due-date">
        {formatDate(props.due_date)}
      </span>
    </div>
  );
}

export default EventEntry;
