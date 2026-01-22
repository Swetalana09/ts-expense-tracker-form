import {state} from "./app.state";

const storage={
setState(){
    localStorage.setItem('expense-data',JSON.stringify(state.records));
},

    getState(){
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

