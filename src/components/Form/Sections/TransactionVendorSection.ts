import { element } from "../../../utils/dom";
import createInputField from "../Elements/InputFields";

export interface TransactionVendorSectionReturn{
    row:HTMLDivElement;
    transactionInput:HTMLInputElement;
    vendorInput:HTMLInputElement;
}
function createTransactionVendorSection():TransactionVendorSectionReturn{
    const row=element('div') as HTMLDivElement;
    row.className='form-row';

    const {container:transactionContainer, input:transactionInput}=createInputField({
        id:'transaction',
        name:'transaction',
        type:'text',
        label:'Transaction ID (optional)',
        placeholder:'e.g, TXN123456',
    });

    const {container:vendorContainer, input:vendorInput}=createInputField({
        id:'name',
        name:'name',
        type:'text',
        label:'Vendor/Store Name (optional)',
        placeholder:'e.g, Amazon',
    });

    row.appendChild(transactionContainer);
    row.appendChild(vendorContainer);
    
    return {row, transactionInput, vendorInput};
}
export default createTransactionVendorSection;