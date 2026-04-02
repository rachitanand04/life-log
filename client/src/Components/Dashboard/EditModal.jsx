import { useState } from "react";
import DatePicker from "react-datepicker";
import { IoMdClose } from "react-icons/io";

function EditModal(props) {
  const { id, content, type, status, due_date } =
    props.entry;
    console.log(due_date);
  const parsedDate = due_date === null ? new Date() : new Date(due_date);

  const [newContent, setNewContent] = useState(content);
  const [startdate, setStartDate] = useState(parsedDate);

  function updateContent(event) {
    const { value } = event.target;
    event.preventDefault();
    setNewContent(value);
  }

  function handleSubmit(event) {
    const updatedObject = {
      id: id,
      type: type,
      content: newContent,
      date: type === "note" || status === "complete" ? null : startdate,
    };
    event.preventDefault();
    props.update(updatedObject);
  }

  return (
    <div className="edit-modal">
      <div className="edit-window">
        <button className="close-button" onClick={props.close}>
          <IoMdClose />
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="content"
            value={newContent}
            onChange={updateContent}
          />
          {type !== "note" && status !== "complete" && (
            <DatePicker
              selected={startdate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="custom-datepicker-input"
            />
          )}
          <button type="submit" className="edit-button">
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
