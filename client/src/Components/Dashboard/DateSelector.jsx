import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector(){

    const [startdate, setStartDate] = useState(new Date());
    return(
        <div className="date-picker">
            <DatePicker selected={startdate} onChange={(date) => setStartDate(date)} className="custom-datepicker-input"/>
        </div>
    )
}

export default DateSelector;