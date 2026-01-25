import { element } from "../../../utils/dom";

export interface FieldsetConfig{
    legend:string;
    required?:boolean;
}

function createFieldset(config: FieldsetConfig): HTMLFieldSetElement{
    const fieldset=element('fieldset') as HTMLFieldSetElement;

    const legend=element('legend');
    if(config.required){
        legend.innerHTML=`${config.legend} <span class="asterisk">*</span>`;
    }else{
        legend.textContent=config.legend;
    }
    fieldset.appendChild(legend);
    return fieldset;
}
export default createFieldset;