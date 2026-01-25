import createRadioGroup from "../Elements/RadioGroups";
import type { RadioOption } from "../Elements/RadioGroups";

export interface PaymentMethodSectionReturn{
    fieldset:HTMLFieldSetElement;
    radios:HTMLInputElement[];
}
function createPaymentMethodSection():PaymentMethodSectionReturn{
    const paymentOptions:RadioOption[]=[
        {id:'payment_cash', label:'Cash', value:'Cash'},
        {id:'payment_card',label:'Credit/Debit Card',value:'Credit/Debit Card'},
        {id:'payment_upi',label:'UPI/Mobile Wallet',value:'UPI/Mobile Wallet'},
        {id:'payment_bank',label:'Bank Transfer',value:'Bank Transfer'},
        {id:'payment_cheque',label:'Cheque',value:'Cheque'},
    ];
    return createRadioGroup({
        name:'payment',
        legend:'Payment Method',
        options:paymentOptions,
        required:true,
    });
}
export default createPaymentMethodSection;