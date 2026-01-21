import {state} from "./app.state";

const storage={
saveState(){
    localStorage.setItem('expense-data',JSON.stringify(state.records));
},

    loadState(){
    const data=localStorage.getItem('expense-data');
    return data?JSON.parse(data):[];
}
} 
export default storage;

