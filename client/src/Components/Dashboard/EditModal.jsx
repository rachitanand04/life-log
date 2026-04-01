import { useState } from "react";
import DatePicker from "react-datepicker";

function EditModal(props) {
  const { id, content, type } = props.entry;
  const [newContent, setNewContent] = useState(content);
  const [startdate, setStartDate] = useState(new Date());

  function updateContent(event) {
    const { value } = event.target;
    event.preventDefault();
    setNewContent(value);
  }

  return (
    <div className="edit-modal">
      <div className="edit-window">
        <form>
          <input
            type="text"
            name="content"
            value={newContent}
            onChange={updateContent}
          />
          {type !== "note" && (
            <DatePicker
              selected={startdate}
              onChange={(date) => setStartDate(date)}
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
