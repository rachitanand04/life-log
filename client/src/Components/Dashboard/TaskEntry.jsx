import { useState } from "react";
import { MdCheckBox,MdCheckBoxOutlineBlank } from "react-icons/md";

function TaskEntry(props){
    const[isDone, toggleDone] = useState(false);
    
    function ToggleCheckbox(event){
        toggleDone(!isDone);
        markComplete();
    }

    function markComplete(){
        const statusChange = {
            type: "complete",
            content: `Task (${props.content}) marked as complete`
        }
        props.complete(statusChange,props.id);
    }
    return(
        <div className="task-entry">
            <button className="checkbox" onClick={ToggleCheckbox}>{isDone ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}</button>
            <p>{props.content}</p>
        </div>
    )
}

export default TaskEntry;