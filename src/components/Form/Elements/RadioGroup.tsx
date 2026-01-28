import React from 'react';

interface RadioOption{
    id:string;
    label:string;
    value:string;
}
interface RadioGroupProps{
    name:string;
    legend:string;
    options:RadioOption[];
    value:string;
    onChange:(value:string)=>void;
    required?:boolean;
    error?:string;
}
const RadioGroup: React.FC<RadioGroupProps>=({
    name,
    legend,
    options,
    value,
    onChange,
    required,
    error
})=>{
    return (
        <fieldset>
            <legend>
                {legend}
                {required && <span className='asterisk'>*</span>}
            </legend>
            {options.map((option)=>(
                <React.Fragment key={option.id}>
                    <input 
                    type='radio'
                    id={option.id}
                    name={name}
                    value={option.value}
                    checked={value===option.value}
                    onChange={(e)=>onChange(e.target.value)}/>
                    <label htmlFor={option.id}>{option.label}</label>
                    <br />
                </React.Fragment>
            ))}
            {error && <div className='error'>{error}</div>}
        </fieldset>
    );
};
export default RadioGroup;