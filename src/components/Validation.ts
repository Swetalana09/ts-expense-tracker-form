const validation={
    required(value:string):string{
        return value.trim()===''?'This field is required':'';
    },

    number(value:number | string):string{
        return value===0 || value===""?"This field is required":"";
    },

    length(value:string, min:number, max:number):string{
        if(value.length<min||value.length>max){
            return `Must be between ${min} and ${max} characters`;
        }
        return '';
    },
    radio(value:string):string{
        return value===''?'Please select an option':'';
    },
    checkbox(checked:boolean):string{
        return checked?'':'Please check this field';
    },
    date(value:string):string{
        return value===''?'Please select a date':'';
    },
    currency(value:string):string{
        return value===''?'Please select a currency':'';
    }
};
export default validation;