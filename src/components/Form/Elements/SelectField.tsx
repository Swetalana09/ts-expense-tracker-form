import React from 'react';

interface SelectFieldProps{
    id:string;
    name:string;
    label:string;
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    options:string[];
    required?:boolean;
    error?:string;
    className?:string;
}

const SelectField: React.FC<SelectFieldProps>=({
    id,
    name,
    label,
    value,
    onChange,
    options,
    required,
    error,
    className
})=>{
    return (
        <div className={`input-group ${className || ''}`}>
            <label htmlFor={id}> 
                {label}
                {required && <span className='asterisk'>*</span>}
            </label>
            <select id={id} name={name} value={value} onChange={onChange}>
                {options.map((option)=>(
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
            {error && <div className='error'>{error}</div>}
        </div>
    );
};
export default SelectField;