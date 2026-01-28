export interface ExpenseForm{
    title:string;
    category:string;
    currency:string;
    amount:number;
    date:string;
    time:string;
    payments:string;
    transactionID:string;
    vendorName:string;
    location:string;
    tags:string;
    notes:string;
    receipt:boolean;
    saveRecurring:boolean;
    saveExpense:boolean;
}

export interface ValidationErrors{
    [key:string]:string;
}