import storage from "./app.storage";
import type { ExpenseForm } from "./types";
import { state } from "./app.state";

const logic={
    addRecord(data:ExpenseForm):void{
    state.addRecord(data);
    storage.saveState();
    console.log('Record added,state saved');
},

updateRecord(data:ExpenseForm):void{
    const editIndex=state.editIndex;
    if(editIndex!=null){
        state.updateRecord(editIndex,data);
        state.editIndex=null;
        storage.saveState();
        console.log('Record updated,state saved');
    }
},

deleteRecord(index:number):void{
    const editIndex=state.editIndex;
    state.deleteRecord(index);

    if(editIndex===index){
        state.editIndex=null;
    }else if(editIndex!==null && editIndex>index){
        state.editIndex=editIndex-1;
    }
    storage.saveState();
    console.log('Record deleted')
},

editRecord(index:number):void{
    state.editIndex=index;
    console.log('edit mode:index',index);
},

getRecord(index:number):ExpenseForm|null{
    return state.getRecord(index);
},

getAllRecords():ExpenseForm[]{
    return state.records;
},

getRecordsCount():number{
    return state.getRecordsCount();
},
isEditing():boolean{
    return state.editIndex!==null;
},
getEditIndex():number|null{
    return state.editIndex;
},

cancelEdit():void{
    state.editIndex=null;
},
clearAllRecords():void{
    state.clearAllRecords();
    storage.saveState();
    console.log('All records cleared');
}
};
export default logic;
// const logic={
//     addRecord,
//     updateRecord,
//     deleteRecord,
//     editRecord,
// };
// export default logic;
