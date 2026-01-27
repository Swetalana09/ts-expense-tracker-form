import { element } from "../utils/dom";

class ValidationService{
    private static instance: ValidationService;
    private constructor() {}
    public static getInstance():ValidationService{
        if(!ValidationService.instance){
            ValidationService.instance=new ValidationService();
        }
        return ValidationService.instance;
    }
    
    public showError(el:HTMLElement,msg:string):void{
    this.removeError(el);
    const e=element('div');
    e.className='error';
    e.textContent=msg;
    if(el.nextSibling){
        el.parentElement?.insertBefore(e,el.nextSibling);
    }else{
        el.parentElement?.appendChild(e);
    }
}
public removeError(el:HTMLElement):void{
    const parent=el.parentElement;
    if(!parent) return;
    const nextSibling=el.nextSibling;
    if(nextSibling&&(nextSibling as HTMLElement).classList?.contains('error')){
        nextSibling.remove();
    }
}
public showGroupError(el:HTMLElement|null,msg:string):void{
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

public validateTitle(titleInput:HTMLInputElement,showRequired:boolean=false):boolean{
    const value=titleInput.value;
    this.removeError(titleInput);

    if(showRequired&&value.trim()===''){
        this.showError(titleInput,'Expense title is required.');
        return false;
    }
    if(value.trim()!==''){
        if(!/^[a-zA-Z0-9]/.test(value)){
            this.showError(titleInput,'Must start with letter or number');
            return false;
        }
        const trimmed=value.trim();
        if(trimmed.length<3){
            this.showError(titleInput,'Must be atleast 3 characters.');
            return false;
        }
        if(trimmed.length>50){
            this.showError(titleInput,'Cannot exceed 50 characters.')
            return false;
        }
    }
    return true;
}
public validateAmount(amountInput:HTMLInputElement,showRequired:boolean=false):boolean{
    const value=amountInput.value.trim();
    this.removeError(amountInput);

    if(showRequired && value===''){
        this.showError(amountInput,'Amount is required.')
        return false;
    }
    if(value!==''){
        if(!/^\d{1,10}(\.\d{0,2})?$/.test(value)){
            this.showError(amountInput,'Enter a valid number (up to 10 digits and 2 decimals).');
            return false;
        }
        if(Number(value)<=0){
            this.showError(amountInput,'Amount must be positive.')
            return false;
        }
    }
    return true;
}

public validateRequired(input:HTMLInputElement|HTMLSelectElement):boolean{
    this.removeError(input);
    if(input.value.trim()===''){
        if(input.id==='dt'){
            this.showError(input,'Please select a date.');
        }else if(input.id==='category'){
            this.showError(input,'Please select a category.');
        }else if(input.id==='currency'){
            this.showError(input,'Please select a currency.');
        }else{
            this.showError(input,'This field is required.');
        }
        return false;
    }
    return true;
}

public validateSelect(select:HTMLSelectElement):boolean{
    this.removeError(select);
    if(select.value==='---select---'){
        if(select.id==='category'){
            this.showError(select,'Please select a category.')
        }else if(select.id==='currency'){
            this.showError(select,'Please select a currency.');
        }else{
            this.showError(select,'Please select an option.');
        }
        return false;
    }
    return true;
}

public validateRadioGroup(radios:HTMLInputElement[]):boolean{
    let radioChecked=false;
    radios.forEach((radio)=>{
        if(radio.checked){
            radioChecked=true;
        }
    });
    if(!radioChecked){
        const firstRadio=radios[0];
        if(firstRadio && firstRadio.parentElement){
            this.showGroupError(firstRadio,'Please select a payment method.');
        }
        return false;
    }
    return true;
}

public validateCheckbox(checkbox:HTMLInputElement):boolean{
    if(!checkbox.checked){
        this.showGroupError(checkbox,'You must save this expense.');
        return false;
    }
    return true;
}

public validateDate(dateInput:HTMLInputElement):boolean{
    this.removeError(dateInput);
    const today=new Date().toISOString().slice(0,10);

    if(dateInput.value>today){
        this.showError(dateInput,'Expense date cannot be in the future.');
        return false;
    }
    return true;
}

public removeGroupError(el:HTMLElement|null):void{
    if(!el) return;
    const parent=el.parentElement;
    if(!parent) return;
    const error=parent.querySelector('.error');
    if(error) error.remove();
}
public removeAllErrors():void{
    document.querySelectorAll('.error').forEach((err)=>err.remove());
}
}
export default ValidationService;