import { element } from "../../../utils/dom";

export interface CheckboxFieldConfig{
    id:string;
    name:string;
    label:string;
    value:string;
    required?:boolean;
}
export interface CheckboxFieldReturn{
    container:HTMLDivElement;
    checkbox:HTMLInputElement;
    label:HTMLLabelElement;
}
function createCheckboxField(config:CheckboxFieldConfig):CheckboxFieldReturn{
    const container=element('div') as HTMLDivElement;
    container.className='checkbox-group';

    const checkbox=element('input') as HTMLInputElement;
    checkbox.type='checkbox';
    checkbox.id=config.id;
    checkbox.name=config.name;
    checkbox.value=config.value;

    const label=element('label') as HTMLLabelElement;
    if(config.required){ 
        label.innerHTML=`${config.label} <span class="asterisk">*</span>`
    }else{
        label.textContent=config.label;
    }
    label.setAttribute('for',config.id);

    container.appendChild(checkbox);
    container.appendChild(label);

    return {container,checkbox,label};
}

export default createCheckboxField;