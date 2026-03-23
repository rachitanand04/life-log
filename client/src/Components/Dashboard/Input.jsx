import { useState } from "react";

function Input(props) {
  const [newLog, setNewLog] = useState({
    content: "",
    type: "note"
  });

  function handleChange(event){
    const {name, value} = event.target;
    event.preventDefault();
    setNewLog((prev)=>({
        ...prev,
        [name]:value
    }));
  }

  function handleSubmit(event){
    event.preventDefault();
    props.addEntry(newLog);
  }

  return (
    <div className="input">
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" placeholder="Enter New Log" onChange={handleChange} value={newLog.content}/>
        <select name="type" onChange={handleChange} value={newLog.type}>
          <option value="note">Note</option>
          <option value="task">Task</option>
          <option value="event">Event</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Input;
