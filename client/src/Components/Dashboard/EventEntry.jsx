import { useState } from "react";
import { MdCheckBox,MdCheckBoxOutlineBlank } from "react-icons/md";

function EventEntry(props){
    const[isDone, toggleDone] = useState(false);
    
    function ToggleCheckbox(event){
        toggleDone(!isDone);
        event.preventDefault();
    }
    return(
        <div className="event-entry">
            <button className="checkbox" onClick={ToggleCheckbox}>{isDone ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}</button>
            <p>{props.content}</p>
        </div>
    )
}

export default EventEntry;