import { element } from "../../../utils/dom";

export interface InputFieldConfig{
    id:string;
    name:string;
    type:'text'|'number'|'date'|'time';
    label:string;
    placeholder?:string;
    required?:boolean;
    maxDate?:string;
}

export interface InputFieldReturn{
    container:HTMLDivElement;
    label:HTMLLabelElement;
    input:HTMLInputElement;
}

function createInputField(config:InputFieldConfig):InputFieldReturn{
    const container=element('div') as HTMLDivElement;
    container.className='input-group';

    const label = element('label') as HTMLLabelElement;
    if(config.required){
        label.innerHTML=`${config.label} <span class="asterisk">*</span>`;
    }else{
        label.textContent=config.label;
    }
    label.setAttribute('for',config.id);

    const input=element('input') as HTMLInputElement;
    input.type=config.type;
    input.id=config.id;
    input.name=config.name;
    if(config.placeholder) input.placeholder=config.placeholder;
    if(config.maxDate && config.type==='date') input.max=config.maxDate;

    container.appendChild(label);
    container.appendChild(input);

    return {container,label,input};
}

export default createInputField;