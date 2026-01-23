import {state} from "./app.state";

function saveState():void{
    try{
        const stateToSave={
            records:state.records,
            editIndex:state.editIndex,
        };
        localStorage.setItem('expenseTrackerState',JSON.stringify(stateToSave));
        console.log("State saved to localStorage:",state.records.length,'records');
    }catch(error){
        console.log('Error saving to localStorag:',error);
    }
}
function loadState():void{
    try{
        const savedState=localStorage.getItem('expenseTrackerState');
        if(savedState){
            const parsed=JSON.parse(savedState);
            state.records=parsed.records||[];
            state.editIndex=parsed.editIndex||null;
            console.log('State loaded from localStorage:',state.records.length,'records');
        }else{
            console.log('No saved state found');
        }
        }catch(error){
            console.error('Error loading from localStorage:',error);
        }
    }
function clearState():void{
    localStorage.removeItem('expenseTrackerState');
    state.records=[];
    state.editIndex=null;
    console.log('State cleared');
}
const storage={
    saveState,
    loadState,
    clearState
};
export default storage;