import React from "react";

interface TextareaFieldProps{
    id:string;
    name:string;
    label:string;
    value:string;
    onChange:(e: React.ChangeEvent<HTMLTextAreaElement>)=>void;
    placeholder?:string;
    required?:boolean;
}
const TextareaField:React.FC<TextareaFieldProps>=({
    id,
    name,
    label,
    value,
    onChange,
    placeholder,
    required
})=>{
    return(
        <div className="input-group">
            <label htmlFor={id}>
                {label}
                {required && <span className="asterisk">*</span>}
            </label>
            <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}/>
        </div>
    );
};
export default TextareaField;