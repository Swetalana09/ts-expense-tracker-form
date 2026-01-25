import { element } from "../../utils/dom";
import { renderApp } from "../App";
import validation from "../Validation";
import { state } from "../../app.state";
import storage from "../../app.storage";
import type { ExpenseForm } from "../../types";
import logic from "../../app.logic";
import { showSuccessModal } from "../Modal";

import createTitleCategorySection from "./Sections/TitleCategorySection";
import createCurrencyAmountSection from "./Sections/CurrencyAmountSection";
import createDateTimeSection from "./Sections/DateTimeSection";
import createPaymentMethodSection from "./Sections/PaymentMethodSection";
import createTransactionVendorSection from "./Sections/TransactionVendorSection";
import createLocationTagsSection from "./Sections/LocationTagsSection";
import createNotesSection from "./Sections/NotesSection";
import createPreferencesSection from "./Sections/PreferenceSection";


function Form():HTMLFormElement{
    const form=element('form') as HTMLFormElement;
    form.className='form';

    const titleCategorySection=createTitleCategorySection();
    const currencyAmountSection=createCurrencyAmountSection();
    const dateTimeSection=createDateTimeSection();
    const paymentMethodSection=createPaymentMethodSection();
    const transactionVendorSection=createTransactionVendorSection();
    const locationTagsSection=createLocationTagsSection();
    const notesSection=createNotesSection();
    const preferencesSection=createPreferencesSection();

    const submitRow=element('div') as HTMLDivElement;
    submitRow.className='submit';
    const submitButton=element('button') as HTMLButtonElement;
    submitButton.type='submit';
    submitButton.textContent=state.editIndex!==null?'UPDATE':'SUBMIT';
    submitRow.appendChild(submitButton);

    form.appendChild(titleCategorySection.row);
    form.appendChild(currencyAmountSection.row);
    form.appendChild(dateTimeSection.row);
    form.appendChild(paymentMethodSection.fieldset);
    form.appendChild(transactionVendorSection.row);
    form.appendChild(locationTagsSection.row);
    form.appendChild(notesSection.container);
    form.appendChild(preferencesSection.fieldset);
    form.appendChild(submitRow);

    const {titleInput,categorySelect}=titleCategorySection;
    const {currencySelect,amountInput}=currencyAmountSection;
    const {dateInput,timeInput}=dateTimeSection;
    const {radios:paymentRadios}=paymentMethodSection;
    const {transactionInput,vendorInput}=transactionVendorSection;
    const {locationInput,tagsInput}=locationTagsSection;
    const {textarea:notesTextarea}=notesSection;
    const {receiptCheckbox,saveRecurringCheckbox,saveExpenseCheckbox}=preferencesSection;


    titleInput.addEventListener('input',()=>validation.validateTitle(titleInput,false));
    titleInput.addEventListener('blur',()=>validation.validateTitle(titleInput,true));
    amountInput.addEventListener('input',()=>validation.validateAmount(amountInput,false));
    amountInput.addEventListener('blur',()=>validation.validateAmount(amountInput,true));
    saveExpenseCheckbox.addEventListener('change',()=>validation.removeGroupError(saveExpenseCheckbox));

    const allInputs=[
        titleInput,
        categorySelect,
        currencySelect,
        amountInput,
        dateInput,
        timeInput,
        transactionInput,
        vendorInput,
        locationInput,
        tagsInput,
    ];

    allInputs.forEach((field)=>{
        field.addEventListener('input',()=>validation.removeError(field));
    });

    paymentRadios.forEach((radio)=>{
    radio.addEventListener('change',()=>{
        const parent=radio.parentElement;
        if(parent){
            const err=parent.querySelector('.error');
            if(err) err.remove();
        }
    });
});

    if(state.editIndex!==null){
        const record=state.records[state.editIndex];
        titleInput.value=record.title;
        categorySelect.value=record.category;
        currencySelect.value=record.currency;
        amountInput.value=record.amount.toString();
        dateInput.value=record.date;
        timeInput.value=record.time||'';
        transactionInput.value=record.transactionID||'';
        vendorInput.value=record.vendorName||'';
        locationInput.value=record.location||'';
        tagsInput.value=record.tags||'';
        notesTextarea.value=record.notes||'';

        paymentRadios.forEach((r)=>{
            if(r.value===record.payments){
                r.checked=true;}
        });
        receiptCheckbox.checked=record.receipt;
        saveRecurringCheckbox.checked=record.saveRecurring;
        saveExpenseCheckbox.checked=record.saveExpense;
    }
form.addEventListener('submit',(e:SubmitEvent):void=>{
        e.preventDefault();
        let valid=true;
        validation.removeAllErrors();
        if(!validation.validateTitle(titleInput,true)) valid=false;
        if(!validation.validateAmount(amountInput,true)) valid=false;
        if(!validation.validateSelect(categorySelect)) valid=false;
        if(!validation.validateSelect(currencySelect)) valid=false;
        if(!validation.validateRequired(dateInput)) valid=false;
        if(dateInput.value && !validation.validateDate(dateInput)) valid=false;
        if(!validation.validateRadioGroup(paymentRadios)) valid=false;
        if(!validation.validateCheckbox(saveExpenseCheckbox)) valid=false;
        if(!valid){
            const firstError=document.querySelector('.error');
            if(firstError){
                firstError.scrollIntoView({behavior:'smooth'});
            }
            return;
        }
        const selectedPayment=paymentRadios.find((r)=>r.checked)?.value||'';

         const data:ExpenseForm={
            title:titleInput.value.trim(),
            category:categorySelect.value,
            currency:currencySelect.value,
            amount:Number(amountInput.value),
            date:dateInput.value,
            time:timeInput.value,
            payments:selectedPayment,
            transactionID:transactionInput.value.trim(),
            vendorName:vendorInput.value.trim(),
            location:locationInput.value.trim(),
            tags:tagsInput.value.trim(),
            notes:notesTextarea.value.trim(),
            receipt:receiptCheckbox.checked,
            saveRecurring:saveRecurringCheckbox.checked,
            saveExpense:saveExpenseCheckbox.checked
        };
        if(state.editIndex===null){
            logic.addRecord(data)
            showSuccessModal('Expense added successfully!',()=>{
                storage.saveState();
                renderApp();
            });
        }else{
            logic.updateRecord(data);
            showSuccessModal('Expense updated successfully!',()=>{
                storage.saveState();
                renderApp();
            });
        }
        });
    return form;
}

export default Form;