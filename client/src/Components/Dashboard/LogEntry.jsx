import { MdEvent, MdOutlineTaskAlt } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function LogEntry(props) {
  return (
    <div className="log-entry">
      <div className="log-entry-left">
        {props.type === "note" ? (
          <FaRegStickyNote />
        ) : props.type === "event" ? (
          <MdEvent />
        ) : (
          <MdOutlineTaskAlt />
        )}
        <p>{props.content}</p>
      </div>
      <div className="log-entry-right">
        <button className="entry-edit">
          <MdEdit />
        </button>
        <button
          className="entry-delete"
          onClick={() => {
            props.delete(props.id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default LogEntry;
