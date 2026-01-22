import storage from "./app.storage";
import type { ExpenseForm } from "./types";
import { state } from "./app.state";

export function addRecord(data:ExpenseForm):void{
    state.records.push(data);
    storage.setState();
}
export function updateRecord(data:ExpenseForm):void{
    if(state.editIndex!=null){
        state.records[state.editIndex]=data;
        state.editIndex=null;
        storage.setState();
    }
}
export function deleteRecord(index:number){
    state.records.splice(index,1);
    if(state.editIndex===index){
        state.editIndex=null;
    }else if(state.editIndex!==null && state.editIndex>index){
        state.editIndex--;
    }
    storage.setState();
}
export function editRecord(index:number):void{
    state.editIndex=index;
}
