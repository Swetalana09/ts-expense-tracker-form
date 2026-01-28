import {useState,useEffect} from 'react';
import type { ExpenseForm, ValidationErrors } from '../types';
import{
    validateTitle,
    validateAmount,
    validateSelect,
    validateRequired,
    validateDate,
    validateRadioGroup,
    validateCheckbox
} from '../utils/validation';

interface UseExpenseFormProps{
    editIndex:number|null;
    editRecord:ExpenseForm|null;
    onSubmit:(data:ExpenseForm)=>void;
    onUpdate:(data:ExpenseForm)=>void;
    showModal:(message:string)=>void;
}

export function useExpenseForm({
    editIndex,editRecord,onSubmit,onUpdate,showModal
}:UseExpenseFormProps){
    const [formData,setFormData]=useState<ExpenseForm>({
        title:'',
        category:'---select---',
        currency:'---select---',
        amount:0,
        date:'',
        time:'',
        payments:'',
        transactionID:'',
        vendorName:'',
        location:'',
        tags:'',
        notes:'',
        receipt:false,
        saveRecurring:false,
        saveExpense:false
    });

    const [errors,setErrors] = useState<ValidationErrors>({});
    const [titleError,setTitleError]=useState('');
    const [amountError,setAmountError]=useState('');


    useEffect(()=>{
        if(editRecord){
            setFormData(editRecord);
            setErrors({});
            setTitleError('');
            setAmountError('');
        }
    },[editRecord]);

    useEffect(()=>{
        if(editIndex===null && !editRecord){
            resetForm();
        }
    },[editIndex, editRecord]);

    const resetForm=()=>{
        setFormData({
        title:'',
        category:'---select---',
        currency:'---select---',
        amount:0,
        date:'',
        time:'',
        payments:'',
        transactionID:'',
        vendorName:'',
        location:'',
        tags:'',
        notes:'',
        receipt:false,
        saveRecurring:false,
        saveExpense:false
    });
    setErrors({});
    setTitleError('');
    setAmountError('');
    };

    const handleChange=(field:keyof ExpenseForm,value:any)=>{
        setFormData(prev=>({...prev,[field]:value}));
        if(errors[field]){
            setErrors(prev=>({...prev,[field]:''}));
        }
    };

    const handleTitleBlur=()=>{
        const error=validateTitle(formData.title,false);
        setTitleError(error);
    };

    const handleAmountBlur=()=>{
        const error=validateAmount(formData.amount.toString(),false);
        setAmountError(error);
    };

    const validateForm=():boolean=>{
        const newErrors:ValidationErrors={};
        let valid=true;

        const titleErr=validateTitle(formData.title,true);
        if(titleErr){
            newErrors.title=titleErr;
            valid=false;
        }

        const amountErr=validateAmount(formData.amount.toString(),true);
        if(amountErr){
            newErrors.amount=amountErr;
            valid=false;
        }

        const categoryErr=validateSelect(formData.category,'category');
        if(categoryErr){
            newErrors.category=categoryErr;
            valid=false;
        }

        const currencyErr=validateSelect(formData.currency,'currency');
        if(currencyErr){
            newErrors.currency=currencyErr;
            valid=false;
        }

        const dateErr=validateRequired(formData.date,'dt');
        if(dateErr){
            newErrors.date=dateErr;
            valid=false;
        }else if(formData.date){
            const dateValidErr=validateDate(formData.date);
            if(dateValidErr){
                newErrors.date=dateValidErr;
                valid=false;
            }
        }

        const paymentErr=validateRadioGroup(formData.payments);
        if(paymentErr){
            newErrors.payments=paymentErr;
            valid=false;
        }

        const saveExpenseErr=validateCheckbox(formData.saveExpense);
        if(saveExpenseErr){
            newErrors.saveExpense=saveExpenseErr;
            valid=false;
        }
        setErrors(newErrors);
        return valid;
    };
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();

        if(!validateForm()){
            setTimeout(()=>{
                const firstError=document.querySelector('.error');
                if(firstError){
                    firstError.scrollIntoView({behavior:'smooth'});
                }
            },100);
            return;
        }

        if(editIndex===null){
            onSubmit(formData);
            showModal('Expense added successfully!');
            resetForm();
        }else{
            onUpdate(formData);
            showModal('Expense updated successfully!')
            resetForm();
        }
    };

    return{
        formData,
        errors,
        titleError,
        amountError,
        handleChange,
        handleTitleBlur,
        handleAmountBlur,
        handleSubmit,
        editIndex
    };
}
