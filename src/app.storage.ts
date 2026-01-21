import { state } from "./app.state";
export function saveToStorage():void{
    localStorage.setItem('appState',JSON.stringify(state));
}

export function loadFromStorage():void{
        const saved=localStorage.getItem('appState');
        if(saved){
            const parsed=JSON.parse(saved);
            state.items=parsed.items ?? [];
            state.form=parsed.form ?? {title:'',amount:0,category:'',editId:null}
        }
    }
