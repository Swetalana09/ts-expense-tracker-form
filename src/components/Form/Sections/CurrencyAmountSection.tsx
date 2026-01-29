import React from 'react';
import InputField from '../Elements/InputField';
import SelectField from '../Elements/SelectField';

interface CurrencyAmountSectionProps{
    currency:string;
    amount:number;
    onCurrencyChange:(value:string)=>void;
    onAmountChange:(value:string)=>void;
    onAmountBlur:()=>void;
    currencyError?:string;
    amountError?:string;
}
const CurrencyAmountSection:React.FC<CurrencyAmountSectionProps>=({
    currency,
    amount,
    onCurrencyChange,
    onAmountChange,
    onAmountBlur,
    currencyError,
    amountError
})=>{
    return(
        <div className='form-row'>
            <SelectField
            id='currency'
            name='currency'
            label='Currency'
            value={currency}
            onChange={(e)=>onCurrencyChange(e.target.value)}
            options={['---select---','USD','INR','EUR']}
            required
            error={currencyError}
            className='flex-1'
            />
            <InputField
            id='amount'
            name='amount'
            type='text'
            label='Amount'
            value={amount||''}
            onChange={(e)=>onAmountChange(e.target.value)}
            onBlur={onAmountBlur}
            placeholder='0.00'
            required
            inputMode='decimal'
            error={amountError}
            className='flex-1'
            />
        </div>
    );
};
export default CurrencyAmountSection;