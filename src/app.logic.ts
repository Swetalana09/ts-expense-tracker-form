import storage from "./app.storage";
import type { ExpenseForm } from "./types";
import { state } from "./app.state";

function addRecord(data:ExpenseForm):void{
    state.records.push(data);
    storage.saveState();
    console.log('Record added,state saved');
}
function updateRecord(data:ExpenseForm):void{
    if(state.editIndex!=null){
        state.records[state.editIndex]=data;
        state.editIndex=null;
        storage.saveState();
        console.log('Record updated,state saved');
    }
}
function deleteRecord(index:number){
    state.records.splice(index,1);
    if(state.editIndex===index){
        state.editIndex=null;
    }else if(state.editIndex!==null && state.editIndex>index){
        state.editIndex--;
    }
    storage.saveState();
    console.log('Record deleted')
}
function editRecord(index:number):void{
    state.editIndex=index;
    console.log('edit mode:index',index);
}
const logic={
    addRecord,
    updateRecord,
    deleteRecord,
    editRecord,
};
export default logic;
