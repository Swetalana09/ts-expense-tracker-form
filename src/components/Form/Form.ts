import { element } from "../../utils/dom";
import ValidationService from "../../services/validation.service";
import StateService from "../../services/state.service";
import type { ExpenseForm } from "../../types";
import LogicService from "../../services/logic.service";
import { ModalService } from "../Modal";
import EventBus from "../../services/eventbus.service";

import createTitleCategorySection from "./Sections/TitleCategorySection";
import createCurrencyAmountSection from "./Sections/CurrencyAmountSection";
import createDateTimeSection from "./Sections/DateTimeSection";
import createPaymentMethodSection from "./Sections/PaymentMethodSection";
import createTransactionVendorSection from "./Sections/TransactionVendorSection";
import createLocationTagsSection from "./Sections/LocationTagsSection";
import createNotesSection from "./Sections/NotesSection";
import createPreferencesSection from "./Sections/PreferenceSection";

class FormComponent{
    private form: HTMLFormElement;
    private validationService:ValidationService;
    private stateService:StateService;
    private logicService:LogicService;
    private eventBus:EventBus;
    private modalService:ModalService;

    private titleInput:HTMLInputElement;
    private categorySelect:HTMLSelectElement;
    private currencySelect:HTMLSelectElement;
    private amountInput:HTMLInputElement;
    private dateInput:HTMLInputElement;
    private timeInput:HTMLInputElement;
    private paymentRadios:HTMLInputElement[];
    private transactionInput:HTMLInputElement;
    private vendorInput:HTMLInputElement;
    private locationInput:HTMLInputElement;
    private tagsInput:HTMLInputElement;
    private notesTextarea:HTMLTextAreaElement;
    private receiptCheckbox:HTMLInputElement;
    private saveRecurringCheckbox:HTMLInputElement;
    private saveExpenseCheckbox:HTMLInputElement;
    private submitButton:HTMLButtonElement;

    constructor(){
        this.form=element('form') as HTMLFormElement;
        this.validationService=ValidationService.getInstance();
        this.stateService=StateService.getInstance();
        this.logicService=LogicService.getInstance();
        this.eventBus=EventBus.getInstance();
        this.modalService=ModalService.getInstance();

        this.titleInput=element('input') as HTMLInputElement;
        this.categorySelect=element('select') as HTMLSelectElement;
        this.currencySelect=element('select') as HTMLSelectElement;
        this.amountInput=element('input') as HTMLInputElement;
        this.dateInput=element('input') as HTMLInputElement;
        this.timeInput=element('input') as HTMLInputElement;
        this.paymentRadios=[];
        this.transactionInput=element('input') as HTMLInputElement;
        this.vendorInput=element('input') as HTMLInputElement;
        this.locationInput=element('input') as HTMLInputElement;
        this.tagsInput=element('input') as HTMLInputElement;
        this.notesTextarea=element('textarea') as HTMLTextAreaElement;
        this.receiptCheckbox=element('input') as HTMLInputElement;
        this.saveRecurringCheckbox=element('input') as HTMLInputElement;
        this.saveExpenseCheckbox=element('input') as HTMLInputElement;
        this.submitButton=element('button') as HTMLButtonElement;

        this.buildForm();
        this.attachValidationListeners();
        this.attachSubmitListener();
        this.subscribeToEvents();
        this.populateIfEditMode();
    }

private buildForm():void{
    this.form.className='form';

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

    this.submitButton=element('button') as HTMLButtonElement;
    this.submitButton.type='submit';
    this.submitButton.textContent=this.stateService.editIndex!==null?'UPDATE':'SUBMIT';
    submitRow.appendChild(this.submitButton);

    this.form.appendChild(titleCategorySection.row);
    this.form.appendChild(currencyAmountSection.row);
    this.form.appendChild(dateTimeSection.row);
    this.form.appendChild(paymentMethodSection.fieldset);
    this.form.appendChild(transactionVendorSection.row);
    this.form.appendChild(locationTagsSection.row);
    this.form.appendChild(notesSection.container);
    this.form.appendChild(preferencesSection.fieldset);
    this.form.appendChild(submitRow);

    this.titleInput=titleCategorySection.titleInput;
    this.categorySelect=titleCategorySection.categorySelect;
    this.currencySelect=currencyAmountSection.currencySelect;
    this.amountInput=currencyAmountSection.amountInput;
    this.dateInput=dateTimeSection.dateInput;
    this.timeInput=dateTimeSection.timeInput;
    this.paymentRadios=paymentMethodSection.radios;
    this.transactionInput=transactionVendorSection.transactionInput;
    this.vendorInput=transactionVendorSection.vendorInput;
    this.locationInput=locationTagsSection.locationInput;
    this.tagsInput=locationTagsSection.tagsInput;
    this.notesTextarea=notesSection.textarea;
    this.receiptCheckbox=preferencesSection.receiptCheckbox;
    this.saveRecurringCheckbox=preferencesSection.saveRecurringCheckbox;
    this.saveExpenseCheckbox=preferencesSection.saveExpenseCheckbox;
}

private attachValidationListeners():void{
    this.titleInput.addEventListener('input',()=>this.validationService.validateTitle(this.titleInput,false));
    this.titleInput.addEventListener('blur',()=>this.validationService.validateTitle(this.titleInput,true));
    this.amountInput.addEventListener('input',()=>this.validationService.validateAmount(this.amountInput,false));
    this.amountInput.addEventListener('blur',()=>this.validationService.validateAmount(this.amountInput,true));
    this.saveExpenseCheckbox.addEventListener('change',()=>this.validationService.removeGroupError(this.saveExpenseCheckbox));

    const allInputs=[this.titleInput, this.categorySelect, this.currencySelect, this.amountInput, this.dateInput,
        this.timeInput, this.transactionInput, this.vendorInput,this.locationInput, this.tagsInput];

    allInputs.forEach((field)=>{
        field.addEventListener('input',()=>this.validationService.removeError(field));
    });

    this.paymentRadios.forEach((radio)=>{
    radio.addEventListener('change',()=>{
        const parent=radio.parentElement;
        if(parent){
            const err=parent.querySelector('.error');
            if(err) err.remove();
        }
    });
});
}
private subscribeToEvents():void{
    this.eventBus.subscribe('EDIT_MODE_CHANGED',(data:unknown)=>{
        const eventData=data as {editIndex:number | null}|undefined;
        console.log('Form: EDIT_MODE_CHANGED event received',eventData);
        console.log('Submit button exists:',!!this.submitButton);
        this.handleEditModeChange();
    });
}
private handleEditModeChange():void{
    if(!this.submitButton){
        console.error('Submit button is undefined');
        return;
    }
    if(this.stateService.editIndex!==null){
        this.populateIfEditMode();
        this.submitButton.textContent='UPDATE';
        console.log('Button changed to UPDATE');
    }else{
        this.resetForm();
        this.submitButton.textContent='SUBMIT';
        console.log('Button changed to SUBMIT');
    }
}

private populateIfEditMode():void{
    if(this.stateService.editIndex!==null){
        const record = this.stateService.records[this.stateService.editIndex];
        if(record){
        this.titleInput.value=record.title;
        this.categorySelect.value=record.category;
        this.currencySelect.value=record.currency;
        this.amountInput.value=record.amount.toString();
        this.dateInput.value=record.date;
        this.timeInput.value=record.time||'';
        this.transactionInput.value=record.transactionID||'';
        this.vendorInput.value=record.vendorName||'';
        this.locationInput.value=record.location||'';
        this.tagsInput.value=record.tags||'';
        this.notesTextarea.value=record.notes||'';

        this.paymentRadios.forEach((r)=>{
            if(r.value===record.payments){
                r.checked=true;}
        });
        this.receiptCheckbox.checked=record.receipt;
        this.saveRecurringCheckbox.checked=record.saveRecurring;
        this.saveExpenseCheckbox.checked=record.saveExpense;

        if(this.submitButton){
        this.submitButton.textContent='UPDATE';
        }
    }
}
}
private attachSubmitListener():void{
    this.form.addEventListener('submit',(e:SubmitEvent):void=>{
        e.preventDefault();
        this.handleSubmit();
    });
}
private handleSubmit():void{
        let valid=true;
        this.validationService.removeAllErrors();

        if(!this.validationService.validateTitle(this.titleInput,true)) valid=false;
        if(!this.validationService.validateAmount(this.amountInput,true)) valid=false;
        if(!this.validationService.validateSelect(this.categorySelect)) valid=false;
        if(!this.validationService.validateSelect(this.currencySelect)) valid=false;
        if(!this.validationService.validateRequired(this.dateInput)) valid=false;
        if(this.dateInput.value && !this.validationService.validateDate(this.dateInput)) valid=false;
        if(!this.validationService.validateRadioGroup(this.paymentRadios)) valid=false;
        if(!this.validationService.validateCheckbox(this.saveExpenseCheckbox)) valid=false;

        if(!valid){
            const firstError=document.querySelector('.error');
            if(firstError){
                firstError.scrollIntoView({behavior:'smooth'});
            }
            return;
        }
        const selectedPayment=this.paymentRadios.find((r)=>r.checked)?.value||'';

         const data:ExpenseForm={
            title:this.titleInput.value.trim(),
            category:this.categorySelect.value,
            currency:this.currencySelect.value,
            amount:Number(this.amountInput.value),
            date:this.dateInput.value,
            time:this.timeInput.value,
            payments:selectedPayment,
            transactionID:this.transactionInput.value.trim(),
            vendorName:this.vendorInput.value.trim(),
            location:this.locationInput.value.trim(),
            tags:this.tagsInput.value.trim(),
            notes:this.notesTextarea.value.trim(),
            receipt:this.receiptCheckbox.checked,
            saveRecurring:this.saveRecurringCheckbox.checked,
            saveExpense:this.saveExpenseCheckbox.checked
        };
        if(this.stateService.editIndex===null){
            this.logicService.addRecord(data)
            this.modalService.showSuccess('Expense added successfully!',()=>{
                this.resetForm();
            });
        }else{
            this.logicService.updateRecord(data);
            this.modalService.showSuccess('Expense updated successfully!',()=>{
                this.resetForm();
            });
        }
    }
private resetForm():void{
    this.form.reset();
    this.paymentRadios.forEach(r=>r.checked=false);
    if(this.submitButton){
    this.submitButton.textContent='SUBMIT';
    }
    this.validationService.removeAllErrors();
}
public render():HTMLFormElement{
    return this.form;
}
}

export default FormComponent;