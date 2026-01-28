import TitleCategorySection from './Sections/TitleCategorySection';
import CurrencyAmountSection from './Sections/CurrencyAmountSection';
import DateTimeSection from './Sections/DateTimeSection';
import PaymentMethodSection from './Sections/PaymentMethodSection';
import TransactionVendorSection from './Sections/TransactionVendorSection';
import LocationTagsSection from './Sections/LocationTagsSection';
import NotesSection from './Sections/NotesSection';
import PreferencesSection from './Sections/PreferencesSection';
import { useExpenseForm } from '../../hooks/useExpenseForm';
import type { ExpenseForm as ExpenseFormType } from '../../types';

interface ExpenseFormProps{
    editIndex:number|null;
    editRecord:ExpenseFormType|null;
    onSubmit:(data:ExpenseFormType)=>void;
    onUpdate:(data:ExpenseFormType)=>void;
    showModal:(message:string)=>void;
}

function ExpenseForm(props:ExpenseFormProps){
    const{
        formData,
        errors,
        titleError,
        amountError,
        handleChange,
        handleTitleBlur,
        handleAmountBlur,
        handleSubmit,
        editIndex
    }=useExpenseForm(props);

return(
        <form className='form' onSubmit={handleSubmit}>
            {/*Title and Category*/}
            <TitleCategorySection
            title={formData.title}
            category={formData.category}
            onTitleChange={(value)=>handleChange('title',value)}
            onCategoryChange={(value)=>handleChange('category',value)}
            onTitleBlur={handleTitleBlur}
            titleError={errors.title||titleError}
            categoryError={errors.category}
            />

            {/*Currency and Amount Section*/}
            <CurrencyAmountSection
            currency={formData.currency}
            amount={formData.amount}
            onCurrencyChange={(value)=>handleChange('currency',value)}
            onAmountChange={(value)=>handleChange('amount',value)}
            onAmountBlur={handleAmountBlur}
            currencyError={errors.currency}
            amountError={errors.amount||amountError}
            />

            {/*Date and Time Section*/}
            <DateTimeSection
            date={formData.date}
            time={formData.time}
            onDateChange={(value)=>handleChange('date',value)}
            onTimeChange={(value)=>handleChange('time',value)}
            dateError={errors.date}
            />

            {/* Payment Method Section*/}
            <PaymentMethodSection
            payments={formData.payments}
            onPaymentsChange={(value)=>handleChange('payments',value)}
            paymentsError={errors.payments}
            />


            {/*Transaction and Vendor Section*/}
            <TransactionVendorSection
            transactionID={formData.transactionID}
            vendorName={formData.vendorName}
            onTransactionChange={(value)=>handleChange('transactionID',value)}
            onVendorChange={(value)=>handleChange('vendorName',value)}
            />

            {/*Location and Tags Section*/}
            <LocationTagsSection
            location={formData.location}
            tags={formData.tags}
            onLocationChange={(value)=>handleChange('location',value)}
            onTagsChange={(value)=>handleChange('tags',value)}
            />


            {/*Notes Section*/}
            <NotesSection
            notes={formData.notes}
            onNotesChange={(value)=>handleChange('notes',value)}
            />

            {/*Preference Section*/}
            <PreferencesSection
            receipt={formData.receipt}
            saveRecurring={formData.saveRecurring}
            saveExpense={formData.saveExpense}
            onReceiptChange={(checked)=>handleChange('receipt',checked)}
            onSaveRecurringChange={(checked)=>handleChange('saveRecurring',checked)}
            onSaveExpenseChange={(checked)=>handleChange('saveExpense',checked)}
            saveExpenseError={errors.saveExpense}
            />

            {/*Submit button*/}
            <div className='submit'>
                <button type='submit'>
                    {editIndex!==null?'UPDATE':'SUBMIT'}
                </button>
            </div>
        </form>
    );
};
export default ExpenseForm;