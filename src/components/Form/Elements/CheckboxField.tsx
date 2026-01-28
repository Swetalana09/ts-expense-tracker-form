import React from "react";

interface CheckboxFieldProps{
    id:string;
    name:string;
    label:string;
    checked:boolean;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    required?:boolean;
}
const CheckboxField:React.FC<CheckboxFieldProps>=({
    id,
    name,
    label,
    checked,
    onChange,
    required
})=>{
    return(
        <div className="checkbox-group">
            <input
            type='checkbox'
            id={id}
            name={name}
            value='Yes'
            checked={checked}
            onChange={onChange}
            />
            <label htmlFor={id}>
                {label}
                {required && <span className="asterisk">*</span>}
            </label>
        </div>
    );
};
export default CheckboxField;