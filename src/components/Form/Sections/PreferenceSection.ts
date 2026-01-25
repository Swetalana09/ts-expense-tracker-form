import { element } from "../../../utils/dom";
import createCheckboxField from "../Elements/CheckboxField";

export interface PreferencesSectionReturn{
    fieldset:HTMLFieldSetElement;
    receiptCheckbox:HTMLInputElement;
    saveRecurringCheckbox:HTMLInputElement;
    saveExpenseCheckbox:HTMLInputElement;
}
function createPreferencesSection():PreferencesSectionReturn{
    const fieldset=element('fieldset') as HTMLFieldSetElement;
    const legend=element('legend');
    legend.textContent='Expense Preferences';
    fieldset.appendChild(legend);

    const {container:receiptContainer, checkbox:receiptCheckbox}=createCheckboxField({
        id:'receipt_available',
        name:'receipt',
        label:'Receipt available',
        value:'Yes',
    });
    const {container:recurringContainer, checkbox:saveRecurringCheckbox}=createCheckboxField({
        id:'save_recurring',
        name:'save_recurring',
        label:'Save this recurring expense',
        value:'Yes',
    });  
    const {container:saveContainer, checkbox:saveExpenseCheckbox}=createCheckboxField({
        id:'save_expense',
        name:'save_expense',
        label:'Save this expense',
        value:'Yes',
        required:true,
    });      

    fieldset.appendChild(receiptContainer);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(recurringContainer);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(saveContainer);

    return {fieldset,receiptCheckbox,saveRecurringCheckbox,saveExpenseCheckbox};
}
export default createPreferencesSection;
