export const validateTitle = (value:string, showRequired:boolean=false):string=>{
    if(showRequired&&value.trim()===''){
        return 'Expense title is required.';
    }
    if(value.trim()!==''){
        if(!/^[a-zA-Z0-9]/.test(value)){
            return 'Must start with letter or number';
        }
        const trimmed=value.trim();
        if(trimmed.length<3){
            return 'Must be atleast 3 characters.';
        }
        if(trimmed.length>50){
            return 'Cannot exceed 50 characters.';
        }
    }
    return '';
};

export const validateAmount=(value:string, showRequired:boolean=false):string=>{
    const val=value.trim();

    if(showRequired && (val==='' || val=='0')){
        return 'Amount is required.'
    }
    if(val!=='' && val!=='0'){
        if(!/^\d{1,10}(\.\d{0,2})?$/.test(val)){
            return 'Enter a valid number (up to 10 digits and 2 decimals).';
        }
        const numValue=Number(val);
        if(numValue<=0){
            return 'Amount must be positive.';
        }
    }
    return '';
};

export const validateSelect=(value:string, fieldId:string):string=>{
    if(value==='---select---'){
        if(fieldId==='category'){
            return 'Please select a category.';
        }else if(fieldId==='currency'){
            return 'Please select a currency.';
        }
            return 'Please select an option.';
    }
    return '';
};

export const validateRequired=(value:string, fieldId:string):string=>{
    if(value.trim()===''){
        if(fieldId==='dt'){
            return 'Please select a date.';
        }else if(fieldId==='category'){
            return 'Please select a category.';
        }else if(fieldId==='currency'){
            return 'Please select a currency.';
        }
            return 'This field is required.';
        }
        return '';
};

export const validateCheckbox=(checked:boolean):string=>{
    if(!checked){
        return 'You must save this expense.';
    }
    return '';
};

export const validateDate=(value:string):string=>{
    const today=new Date().toISOString().slice(0,10);

    if(value>today){
        return 'Expense date cannot be in the future.';
    }
    return '';
};

export const validateRadioGroup=(value:string):string=>{
    if(!value){
        return 'Please select a payment method';  
        }
        return '';
};

