import React from "react";
import InputField from "../Elements/InputField";

interface DateTimeSectionProps{
    date:string;
    time:string;
    onDateChange:(value:string)=>void;
    onTimeChange:(value:string)=>void;
    dateError?:string;
}

const DateTimeSection:React.FC<DateTimeSectionProps>=({
    date,
    time,
    onDateChange,
    onTimeChange,
    dateError
})=>{
    const today=new Date().toISOString().split('T')[0];

    return(
        <div className="form-row">
            <InputField
            id='dt'
            name='dt'
            type='date'
            label='Date'
            value={date}
            onChange={(e)=>onDateChange(e.target.value)}
            maxDate={today}
            required
            error={dateError}
            />
            <InputField
            id='appt'
            name='appt'
            type='time'
            label='Time (optional)'
            value={time}
            onChange={(e)=>onTimeChange(e.target.value)}
            />
        </div>
    );
};
export default DateTimeSection;