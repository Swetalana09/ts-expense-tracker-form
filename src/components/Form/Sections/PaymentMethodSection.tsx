import React from "react";
import RadioGroup from "../Elements/RadioGroup";

interface PaymentMethodSectionProps{
    payments:string;
    onPaymentsChange:(value:string)=>void;
    paymentsError?:string;
}
const PaymentMethodSection:React.FC<PaymentMethodSectionProps>=({
    payments,
    onPaymentsChange,
    paymentsError
})=>{
    const paymentOptions=[
        {id:'payment_cash', label:'Cash', value:'Cash'},
        {id:'payment_card',label:'Credit/Debit Card',value:'Credit/Debit Card'},
        {id:'payment_upi',label:'UPI/Mobile Wallet',value:'UPI/Mobile Wallet'},
        {id:'payment_bank',label:'Bank Transfer',value:'Bank Transfer'},
        {id:'payment_cheque',label:'Cheque',value:'Cheque'},        
    ];

    return( <RadioGroup
    name='payment'
    legend='Payment Method'
    value={payments}
    onChange={onPaymentsChange}
    options={paymentOptions}
    required
    error={paymentsError}
    />
    );
};
export default PaymentMethodSection;