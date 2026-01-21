export interface Item{
    id:string;
    title:string;
    completed:boolean;
}
export interface FormState{
    title:String;
    editId:String|null;
}
export interface AppState{
    items:Item[];
    form:FormState;
}
