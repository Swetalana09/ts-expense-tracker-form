import { AppState, Expense } from "./types";

const storage_key='expenseAppState';

export const state:AppState={
    expenses:[],
    form:{
        title:'',
        editId:null
    }
};

export function loadState():void{
    const stored=localStorage.getItem(storage_key);
    if(stored){
        try{
            const parsed:AppState=JSON.parse(stored);
            state.expenses=parsed.expenses||[];
            state.form=parsed.form||{title:'',editId:null};
        }
        catch(e){
            console.error('Failed to parse localStorage state',e);
        }
    }
}
export function saveState():void{
    localStorage.setItem(storage_key,JSON.stringify(state));
}
export function addExpense(expense:Expense):void{
    state.expenses.push(expense);
    saveState();
}
export function updateExpense(updated:Expense):void{
    const index=state.expenses.findIndex(e=>e.id===updated.id);
    if(index>-1){
        state.expenses[index]=updated;
        saveState();
    }
}
export function deleteExpense(id:string):void{
    state.expenses=state.expenses.filter(e=>e.id!==id);
    saveState();
}
export function resetForm():void{
    state.form={title:'',editId:null};
    saveState();
}