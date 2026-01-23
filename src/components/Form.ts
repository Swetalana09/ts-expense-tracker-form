import { element } from "../utils/dom";
import { renderApp } from "./App";
import validation from "./Validation";
import { state } from "../app.state";
import storage from "../app.storage";
import type { ExpenseForm } from "../types";
import logic from "../app.logic";

export function Form(): HTMLFormElement{
const form=element('form') as HTMLFormElement;
form.className='form';

const formRow1=element('div');
formRow1.className='form-row';
const titleGroup=element('div');
titleGroup.className='input-group flex-2';
const titleLabel=element('label');
titleLabel.innerHTML='Expense Title <span class="asterisk">*</span>';
const title=element('input') as HTMLInputElement;
title.type='text';
title.name='exptitle';
title.id='exptitle';
title.placeholder='e.g., Lunch at restaurant';
titleGroup.appendChild(titleLabel);
titleGroup.appendChild(title);

const categoryGroup=element('div');
categoryGroup.className='input-group flex-1';
const categoryLabel=element('label')
categoryLabel.innerHTML='Category <span class="asterisk">*</span';
const category=element('select') as HTMLSelectElement;
category.name='category';
category.id='category';
['---select---','Housing','Food','Transportation','Health','Shopping','Entertainment','Technology','Miscellaneous expenses'].forEach(c=>{
const option=element('option') as HTMLOptionElement;
option.textContent=c;
category.appendChild(option);
});
categoryGroup.appendChild(categoryLabel);
categoryGroup.appendChild(category);
formRow1.appendChild(titleGroup);
formRow1.appendChild(categoryGroup);
form.appendChild(formRow1);

const formRow2=element('div');
formRow2.className='form-row';
const currencyGroup=element('div');
currencyGroup.className='input-group flex1';
const currencyLabel=element('label');
currencyLabel.innerHTML='Currency <span class="asterisk">*</span';
const currency=element('select') as HTMLSelectElement;
currency.name='currency';
currency.id='currency';
['---select---','USD','INR','EUR'].forEach(c=>{
const option=element('option') as HTMLOptionElement;
option.textContent=c;
currency.appendChild(option);
});
currencyGroup.appendChild(currencyLabel);
currencyGroup.appendChild(currency);

const amountGroup=element('div');
amountGroup.className='input-group flex-1';
const amountLabel=element('label');
amountLabel.innerHTML='Amount <span class="asterisk">*</span';
const amount=element('input') as HTMLInputElement;
amount.type='number';
amount.name='amount';
amount.id='amount';
amount.placeholder='Enter Amount';
amountGroup.appendChild(amountLabel);
amountGroup.appendChild(amount);

formRow2.appendChild(currencyGroup);
formRow2.appendChild(amountGroup);
form.appendChild(formRow2);

const formRow3=element('div');
formRow3.className='form-row';
const dateGroup=element('div');
dateGroup.className='input-group';
const dateLabel=element('label');
dateLabel.innerHTML='Date <span class="asterisk">*</span';
const date=element('input') as HTMLInputElement;
date.type='date';
date.name='dt';
date.id='dt';
date.max=new Date().toISOString().split('T')[0];;
dateGroup.appendChild(dateLabel);
dateGroup.appendChild(date);

const timeGroup=element('div');
timeGroup.className='input-group';
const timeLabel=element('label');
timeLabel.textContent='Time';
const time=element('input') as HTMLInputElement;
time.type='time'
time.name='appt';
time.id='appt';
timeGroup.appendChild(timeLabel);
timeGroup.appendChild(time);

formRow3.appendChild(dateGroup);
formRow3.appendChild(timeGroup);
form.appendChild(formRow3);

const paymentSection=element('fieldset');
const paymentLegend=element('legend');
paymentLegend.innerHTML='Payment Method <span class="asterisk">*</span';
paymentSection.appendChild(paymentLegend);
const payments=[{id:'payment_card', label:'Cash', value:'Cash'},
{id:'payment_card',label:'Credit/Debit Card',value:'Credit/Debit Card'},
{id:'payment_upi',label:'UPI/Mobile Wallet',value:'UPI/Mobile Wallet'},
{id:'payment_bank',label:'Bank Transfer',value:'Bank Transfer'},
{id:'payment_cheque',label:'Cheque',value:'Cheque'},];
const paymentRadios:HTMLInputElement[]=[];
payments.forEach(p=>{
const radio=element('input') as HTMLInputElement;
radio.type='radio';
radio.name='payment';
radio.id=p.id;
radio.value=p.value;
paymentRadios.push(radio);
const label=element('label');
label.textContent=p.label;
label.setAttribute('for',p.id);
paymentSection.appendChild(radio);
paymentSection.appendChild(label);
paymentSection.appendChild(document.createElement('br'));
});
form.appendChild(paymentSection);


const formRow4=element('div');
formRow4.className='form-row';
const transactionGroup=element('div');
transactionGroup.className='input-group';
const transactionLabel=element('label');
transactionLabel.textContent='Transaction ID (optional)';
const transactionID=element('input') as HTMLInputElement;
transactionID.name='transaction';
transactionID.id='transaction';
transactionID.placeholder='e.g.,TXN123456';
transactionID.type='text';
transactionGroup.appendChild(transactionLabel);
transactionGroup.appendChild(transactionID);
const vendorGroup=element('div');
vendorGroup.className='input-group';
const vendorLabel=element('label');
vendorLabel.textContent='Vendor/Store Name (optional)';
const vendorName=element('input') as HTMLInputElement;
vendorName.name='name';
vendorName.id='name';
vendorName.placeholder='e.g.,Amazon';
vendorName.type="text";
vendorGroup.appendChild(vendorLabel);
vendorGroup.appendChild(vendorName);
formRow4.appendChild(transactionGroup);
formRow4.appendChild(vendorGroup);
form.appendChild(formRow4);

const formRow5=element('div');
formRow5.className='form-row';
const locationGroup=element('div');
locationGroup.className='input-group';
const locationLabel=element('label');
locationLabel.textContent='Location';
const location=element('input') as HTMLInputElement;
location.name='loc';
location.id='loc';
location.placeholder='Start typing a location...';
location.type='text';
locationGroup.appendChild(locationLabel);
locationGroup.appendChild(location);
const tagsGroup=element('div');
tagsGroup.className='input-group';
const tagsLabel=element('label');
tagsLabel.textContent='Tags';
const tags=element('input') as HTMLInputElement;
tags.name='tags';
tags.id='tags';
tags.placeholder='e.g.,work, personal, urgent (comma-separated)';
tags.type='text';
tagsGroup.appendChild(tagsLabel);
tagsGroup.appendChild(tags);
formRow5.appendChild(locationGroup);
formRow5.appendChild(tagsGroup);
form.appendChild(formRow5);

const formRowNotes=element('div');
formRowNotes.className='input-group';
const notesLabel=element('label');
notesLabel.textContent='Notes/Description';
formRowNotes.appendChild(notesLabel);
const notes=element('textarea') as HTMLTextAreaElement;
notes.name='note';
notes.id='note';
notes.placeholder='Add any additional notes...';
formRowNotes.appendChild(notes);
form.appendChild(formRowNotes);

const formRowPrefs=element('fieldset');
const prefsLegend=element('legend');
prefsLegend.textContent='Expense Preferences';
formRowPrefs.appendChild(prefsLegend);

const receipt=element('input') as HTMLInputElement;
receipt.id='receipt_available';
receipt.name='receipt';
receipt.value='Available';
receipt.type='checkbox';
receipt.value='Yes';
const receiptLabel=element('label');
receiptLabel.textContent='Receipt Available';
formRowPrefs.appendChild(receipt);
formRowPrefs.appendChild(receiptLabel);
formRowPrefs.appendChild(document.createElement('br'));

const saveRecurring=element('input') as HTMLInputElement;
saveRecurring.id='save_recurring';
saveRecurring.name='save_recurring';
saveRecurring.value='Yes';
saveRecurring.type='checkbox';
const saveRecurringLabel=element('label');
saveRecurringLabel.textContent='Save this recurring expense';
saveRecurringLabel.setAttribute('for','save_recurring');
formRowPrefs.appendChild(saveRecurring);
formRowPrefs.appendChild(saveRecurringLabel);
formRowPrefs.appendChild(document.createElement('br'));

const saveExpense=element('input') as HTMLInputElement;
saveExpense.id='save_expense';
saveExpense.name='save_expense';
saveExpense.value='Yes';
saveExpense.type='checkbox';
const saveExpenseLabel=element('label');
saveExpenseLabel.innerHTML='Save this expense <span class="asterisk">*</span';
saveExpenseLabel.setAttribute('for','save_recurring');
formRowPrefs.appendChild(saveExpense);
formRowPrefs.appendChild(saveExpenseLabel);
formRowPrefs.appendChild(document.createElement('br'));
form.appendChild(formRowPrefs);

const formRowSubmit=element('div');
formRowSubmit.className='submit';
const submitButton=element('button') as HTMLButtonElement;
submitButton.type='submit';
submitButton.textContent=state.editIndex!==null?'UPDATE':'SUBMIT';
formRowSubmit.appendChild(submitButton);
form.appendChild(formRowSubmit);

    title.addEventListener('input',()=>validation.validateTitle(title,false));
    title.addEventListener('blur',()=>validation.validateTitle(title,true));
    amount.addEventListener('input',()=>validation.validateAmount(amount,false));
    amount.addEventListener('blur',()=>validation.validateAmount(amount,true));
    saveExpense.addEventListener('change',()=>{validation.removeGroupError(saveExpense);});

    const allInputs=[title,category,currency,amount,date,time,transactionID,vendorName,location,tags];
    allInputs.forEach((field)=>{
        field.addEventListener('input',()=>{
            validation.removeError(field);
        });
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
        title.value=record.title;
        category.value=record.category;
        currency.value=record.currency;
        amount.value=record.amount.toString();
        date.value=record.date;
        time.value=record.time||'';
        transactionID.value=record.transactionID||'';
        vendorName.value=record.vendorName||'';
        location.value=record.location||'';
        tags.value=record.tags||'';
        notes.value=record.notes||'';
        saveRecurring.checked=record.saveRecurring;
        saveExpense.checked=record.saveExpense;
        paymentRadios.forEach((r)=>{
            if(r.value===record.payments){
                r.checked=true;}
        });
        receipt.checked=record.receipt;
    }
    form.addEventListener('submit',(e:SubmitEvent):void=>{
        e.preventDefault();
        let valid=true;
        validation.removeAllErrors();
        if(!validation.validateTitle(title,true)) valid=false;
        if(!validation.validateAmount(amount,true)) valid=false;
        if(!validation.validateSelect(category)) valid=false;
        if(!validation.validateSelect(currency)) valid=false;
        if(!validation.validateRequired(date)) valid=false;
        if(date.value && !validation.validateDate(date)) valid=false;
        if(!validation.validateRadioGroup(paymentRadios)) valid=false;
        if(!validation.validateCheckbox(saveExpense)) valid=false;
        if(!valid){
            const firstError=document.querySelector('.error');
            if(firstError){
                firstError.scrollIntoView({behavior:'smooth'});
            }
            return;
        }
        const selectedpayments=paymentRadios.find((r)=>r.checked)?.value||'';
        
        const data:ExpenseForm={
            title:title.value.trim(),
            category:category.value,
            currency:currency.value,
            amount:Number(amount.value),
            date:date.value,
            time:time.value,
            payments:selectedpayments,
            transactionID:transactionID.value.trim(),
            vendorName:vendorName.value.trim(),
            location:location.value.trim(),
            tags:tags.value.trim(),
            notes:notes.value.trim(),
            receipt:receipt.checked,
            saveRecurring:saveRecurring.checked,
            saveExpense:saveExpense.checked
        };
        if(state.editIndex===null){
            logic.addRecord(data)
            alert('Form submitted successfully!')
        }else{
            logic.updateRecord(data);
            alert('Form updated successfully!');
        }
        storage.saveState();
        renderApp();
    });
    return form;
}
