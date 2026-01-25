import { element } from "../utils/dom";

function showError(el:HTMLElement,msg:string):void{
    removeError(el);
    const e=element('div');
    e.className='error';
    e.textContent=msg;
    if(el.nextSibling){
        el.parentElement?.insertBefore(e,el.nextSibling);
    }else{
        el.parentElement?.appendChild(e);
    }
}
function removeError(el:HTMLElement):void{
    const parent=el.parentElement;
    if(!parent) return;
    const nextSibling=el.nextSibling;
    if(nextSibling&&(nextSibling as HTMLElement).classList?.contains('error')){
        nextSibling.remove();
    }
}
function showGroupError(el:HTMLElement|null,msg:string):void{
    if(!el) return;
    const parent=el.parentElement;
    if(!parent) return;
    const existing=parent.querySelector('.error');
    if(existing) existing.remove();
    const e=element('div');
    e.className='error';
    e.textContent=msg;
    parent.appendChild(e);
}

function validateTitle(titleInput:HTMLInputElement,showRequired:boolean=false):boolean{
    const value=titleInput.value;
    removeError(titleInput);

    if(showRequired&&value.trim()===''){
        showError(titleInput,'Expense title is required.');
        return false;
    }
    if(value.trim()!==''){
        if(!/^[a-zA-Z0-9]/.test(value)){
            showError(titleInput,'Must start with letter or number');
            return false;
        }
        const trimmed=value.trim();
        if(trimmed.length<3){
            showError(titleInput,'Must be atleast 3 characters.');
            return false;
        }
        if(trimmed.length>50){
            showError(titleInput,'Cannot exceed 50 characters.')
            return false;
        }
    }
    return true;
}
function validateAmount(amountInput:HTMLInputElement,showRequired:boolean=false):boolean{
    const value=amountInput.value.trim();
    removeError(amountInput);

    if(showRequired && value===''){
        showError(amountInput,'Amount is required.')
        return false;
    }
    if(value!==''){
        if(!/^\d{1,10}(\.\d{0,2})?$/.test(value)){
            showError(amountInput,'Enter a valid number (up to 10 digits and 2 decimals).');
            return false;
        }
        if(Number(value)<=0){
            showError(amountInput,'Amount must be positive.')
            return false;
        }
    }
    return true;
}

function validateRequired(input:HTMLInputElement|HTMLSelectElement):boolean{
    removeError(input);
    if(input.value.trim()===''){
        if(input.id==='dt'){
            showError(input,'Please select a date.');
        }else if(input.id==='category'){
            showError(input,'Please select a category.');
        }else if(input.id==='currency'){
            showError(input,'Please select a currency.');
        }else{
            showError(input,'This field is required.');
        }
        return false;
    }
    return true;
}

function validateSelect(select:HTMLSelectElement):boolean{
    removeError(select);
    if(select.value==='---select---'){
        if(select.id==='category'){
            showError(select,'Please select a category.')
        }else if(select.id==='currency'){
            showError(select,'Please select a currency.');
        }else{
            showError(select,'Please select an option.');
        }
        return false;
    }
    return true;
}

function validateRadioGroup(radios:HTMLInputElement[]):boolean{
    let radioChecked=false;
    radios.forEach((radio)=>{
        if(radio.checked){
            radioChecked=true;
        }
    });
    if(!radioChecked){
        const firstRadio=radios[0];
        if(firstRadio && firstRadio.parentElement){
            showGroupError(firstRadio,'Please select a payment method.');
        }
        return false;
    }
    return true;
}

function validateCheckbox(checkbox:HTMLInputElement):boolean{
    if(!checkbox.checked){
        showGroupError(checkbox,'You must save this expense.');
        return false;
    }
    return true;
}

function validateDate(dateInput:HTMLInputElement):boolean{
    removeError(dateInput);
    const today=new Date().toISOString().slice(0,10);

    if(dateInput.value>today){
        showError(dateInput,'Expense date cannot be in the future.');
        return false;
    }
    return true;
}

function removeGroupError(el:HTMLElement|null):void{
    if(!el) return;
    const parent=el.parentElement;
    if(!parent) return;
    const error=parent.querySelector('.error');
    if(error) error.remove();
}
function removeAllErrors():void{
    document.querySelectorAll('.error').forEach((err)=>err.remove());
}
const validation={
    validateTitle,
    validateSelect,
    validateAmount,
    validateRequired,
    validateRadioGroup,
    validateCheckbox,
    validateDate,
    removeAllErrors,
    removeError,
    showError,
    removeGroupError
};
export default validation;