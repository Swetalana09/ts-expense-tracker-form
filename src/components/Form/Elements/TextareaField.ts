import { element } from "../../../utils/dom";

export interface TextareaFieldConfig{
    id:string;
    name:string;
    label:string;
    placeholder?:string;
    required?:boolean;
}
export interface TextareaFieldReturn{
    container:HTMLDivElement;
    label:HTMLLabelElement;
    textarea:HTMLTextAreaElement;
}
function createTextareaField(config:TextareaFieldConfig):TextareaFieldReturn{
    const container=element('div') as HTMLDivElement;
    container.className='input-group';

    const label=element('label') as HTMLLabelElement;
    if(config.required){
        label.innerHTML=`${config.label}<span class="asterisk">*</span>`;
    }else{
        label.textContent=config.label;
    }
    label.setAttribute('for',config.id);
    const textarea=element('textarea') as HTMLTextAreaElement;
    textarea.id=config.id;
    textarea.name=config.name;
    if(config.placeholder) textarea.placeholder=config.placeholder;

    container.appendChild(label);
    container.appendChild(textarea);

    return {container,label,textarea};
}

export default createTextareaField;