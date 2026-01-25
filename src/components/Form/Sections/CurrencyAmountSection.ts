import { element } from "../../../utils/dom";
import createInputField from "../Elements/InputFields";
import createSelectField from "../Elements/SelectFields";


export interface CurrencyAmountSectionReturn{
    row:HTMLDivElement;
    currencySelect:HTMLSelectElement;
    amountInput:HTMLInputElement;
}

function createCurrencyAmountSection(): CurrencyAmountSectionReturn{
    const row=element('div') as HTMLDivElement;
    row.className='form-row';

    const {container:currencyContainer, select:currencySelect}=createSelectField({
        id:'currency',
        name:'currency',
        label:'Currency',
        options:['---select---','USD','INR','EUR'],
        required:true,
    });
    currencyContainer.classList.add('flex-1');

    const {container:amountContainer, input:amountInput}=createInputField({
        id:'amount',
        name:'amount',
        type:'text',
        label:'Amount',
        placeholder:'Enter Amount',
        required:true,
    });
    amountInput.inputMode='decimal';
    amountContainer.classList.add('flex-1');

    row.appendChild(currencyContainer);
    row.appendChild(amountContainer);

    return {row, currencySelect, amountInput};
}
export default createCurrencyAmountSection;