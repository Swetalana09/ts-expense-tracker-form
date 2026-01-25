import { element } from "../../../utils/dom";

export interface RadioOption{
    id:string;
    label:string;
    value:string;
}
export interface RadioGroupConfig{
    name:string;
    legend:string;
    options:RadioOption[];
    required?:boolean;
}
export interface RadioGroupReturn{
    fieldset:HTMLFieldSetElement;
    radios:HTMLInputElement[];
}
function createRadioGroup(config:RadioGroupConfig):RadioGroupReturn{
    const fieldset=element('fieldset') as HTMLFieldSetElement;
    const legend=element('legend');
    if(config.required){
        legend.innerHTML=`${config.legend} <span class="asterisk">*</span>`;
    }else{
        legend.textContent=config.legend;
    }
    fieldset.appendChild(legend);

    const radios:HTMLInputElement[]=[];
    
    config.options.forEach(opt=>{
        const radio=element('input') as HTMLInputElement;
        radio.type='radio';
        radio.name=config.name;
        radio.id=opt.id;
        radio.value=opt.value;
        radios.push(radio);

        const label=element('label') as HTMLLabelElement;
        label.textContent=opt.label;
        label.setAttribute('for',opt.id);

        fieldset.appendChild(radio);
        fieldset.appendChild(label);
        fieldset.appendChild(document.createElement('br'));
    });
    return {fieldset,radios};
}
export default createRadioGroup;
