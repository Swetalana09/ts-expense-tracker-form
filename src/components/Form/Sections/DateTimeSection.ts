import { element } from "../../../utils/dom";
import createInputField from "../Elements/InputFields";

export interface DateTimeSectionReturn{
    row:HTMLDivElement;
    dateInput:HTMLInputElement;
    timeInput:HTMLInputElement;
}
function createDateTimeSection():DateTimeSectionReturn{
    const row=element('div') as HTMLDivElement;
    row.className='form-row';

    const today=new Date().toISOString().split('T')[0];

    const {container:dateContainer, input:dateInput}=createInputField({
        id:'dt',
        name:'dt',
        type:'date',
        label:'Date',
        maxDate:today,
        required:true,
    });
    const {container:timeContainer, input:timeInput}=createInputField({
        id:'appt',
        name:'appt',
        type:'time',
        label:'Time (optional)'
    });
    row.appendChild(dateContainer);
    row.appendChild(timeContainer);

    return {row,dateInput,timeInput};
}

export default createDateTimeSection;