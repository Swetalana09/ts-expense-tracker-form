import React from 'react';

interface InputFieldProps{
    id:string;
    name:string;
    type:'text'|'number'|'date'|'time';
    label:string;
    value:string|number;
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    onBlur?:()=>void;
    placeholder?:string;
    required?:boolean;
    maxDate?:string;
    error?:string;
    className?:string;
    inputMode?:'text'|'decimal';
}

const InputField: React.FC<InputFieldProps>=({
    id,
    name,
    type,
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    maxDate,
    error,
    className,
    inputMode
})=>{
    return (
        <div className={`input-group ${className || ''}`}>
            <label htmlFor={id}> 
                {label}
                {required && <span className='asterisk'>*</span>}
            </label>
            <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            max={maxDate}
            inputMode={inputMode}
            />
            {error && <div className='error'>{error}</div>}
        </div>
    );
};
export default InputField;