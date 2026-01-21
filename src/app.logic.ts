import storage from "./app.storage";
import type { ExpenseForm } from "./types";
import { state } from "./app.state";

export function addRecord(data:ExpenseForm){
    state.records.push(data);
    storage.saveState();
}
export function updateRecord(data:ExpenseForm){
    if(state.editIndex!=null){
        state.records[state.editIndex]=data;
        state.editIndex=null;
        storage.saveState();
    }
}
export function deleteRecord(index:number){
    state.records.splice(index,1);
    storage.saveState();
}
export function editRecord(index:number){
    state.editIndex=index;
}
