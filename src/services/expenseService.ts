import type { ExpenseForm, AppState } from "../types";

class ExpenseService{
    addExpense(state: AppState, expense: ExpenseForm):AppState{
        return{
            ...state,
            records:[...state.records,expense]
        };
    }

    updateExpense(state:AppState, index:number, expense:ExpenseForm):AppState{
        const updated=[...state.records];
        updated[index]=expense;
        return{
            records:updated,
            editIndex:null
        };
    }
    
    deleteExpense(state:AppState,index:number):AppState{
        const newRecords=state.records.filter((_,i)=>i!==index);
        let newEditIndex=state.editIndex;

        if(state.editIndex===index){
            newEditIndex=null;
        }else if(state.editIndex!==null && state.editIndex>index){
            newEditIndex=state.editIndex-1;
        }
        return {
            records:newRecords,
            editIndex:newEditIndex
        };
    }

    setEditMode(state:AppState,index:number):AppState{
        return{
            ...state,
            editIndex:index
        };
    }

    cancelEdit(state:AppState):AppState{
        return{
            ...state,
            editIndex:null
        };
    }

    getExpense(state:AppState,index:number):ExpenseForm|null{
        if(index>=0 && index<state.records.length){
            return state.records[index];
        }
        return null;
    }

    getAllExpenses(state:AppState):ExpenseForm[]{
        return state.records;
    }

    getExpensesCount(state:AppState):number{
        return state.records.length;
    }
}
export const expenseService=new ExpenseService();