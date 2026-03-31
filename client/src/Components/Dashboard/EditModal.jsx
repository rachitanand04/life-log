import DateSelector from "./DateSelector";

function EditModal() {
  return (
    <div className="edit-modal">
      <div className="edit-window">
        <form>
          <input type="text" name="content" />
          <DateSelector />
          <button type="submit" className="edit-button">Done</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
