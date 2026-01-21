import {state} from "./app.state";

const storage={
saveState(){
    localStorage.setItem('expense-data',JSON.stringify(state.records));
},

    loadState(){
    const data=localStorage.getItem('expense-data');
    if(data){
        const parsed=JSON.parse(data);
        if(Array.isArray(parsed)){
            state.records=parsed;
        }
    }
}
} 
export default storage;

