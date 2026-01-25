import { element } from "../../../utils/dom";

export interface SelectFieldConfig{
    id:string;
    name:string;
    label:string;
    options:string[];
    required?:boolean;
}
export interface SelectFieldReturn{
    container:HTMLDivElement;
    label:HTMLLabelElement;
    select:HTMLSelectElement;
}
function createSelectField(config:SelectFieldConfig):SelectFieldReturn{
    const container=element('div') as HTMLDivElement;
    container.className='input-group';

    const label=element('label') as HTMLLabelElement;
    if(config.required){
        label.innerHTML=`${config.label} <span class="asterisk">*</span>`;
    }else{
        label.textContent=config.label;
    }
    label.setAttribute('for',config.id);

    const select= element('select') as HTMLSelectElement;
    select.id=config.id;
    select.name=config.name;

    config.options.forEach(optionText=>{
        const option=element('option') as HTMLOptionElement;
        option.textContent=optionText;
        option.value=optionText;
        select.appendChild(option);
    });
    container.appendChild(label);
    container.appendChild(select);

    return {container,label,select};
}
export default createSelectField;