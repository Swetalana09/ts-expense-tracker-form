import React from "react";
import InputField from "../Elements/InputField";

interface TransactionVendorSectionProps{
    transactionID:string;
    vendorName:string;
    onTransactionChange:(value:string)=>void;
    onVendorChange:(value:string)=>void;
}

const TransactionVendorSection: React.FC<TransactionVendorSectionProps>=({
    transactionID,
    vendorName,
    onTransactionChange,
    onVendorChange
})=>{
    return (
        <div className="form-row">
            <InputField
            id='transaction'
            name='transaction'
            type='text'
            label='Transaction ID (optional)'
            value={transactionID}
            onChange={(e)=>onTransactionChange(e.target.value)}
            placeholder="e.g, TXN123456"
            />
            <InputField
            id='name'
            name='name'
            type='text'
            label='Vendor/Store Name (optional)'
            value={vendorName}
            onChange={(e)=>onVendorChange(e.target.value)}
            placeholder="e.g, Amazon"
            />
        </div>
    );
};
export default TransactionVendorSection;
