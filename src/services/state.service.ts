import type { ExpenseForm } from "../types";

const _state={
    records:[] as ExpenseForm[],
    editIndex:null as number|null
};

export const state={
    get records():ExpenseForm[]{
        return _state.records;
    },

    set records(value:ExpenseForm[]){
        _state.records=value;
    },

    get editIndex():number|null{
        return _state.editIndex;
    },

    set editIndex(value:number|null){
        _state.editIndex=value;
    },

    addRecord(record:ExpenseForm):void{
        _state.records.push(record);
    },

    updateRecord(index:number, record:ExpenseForm):void{
        if(index>=0 && index<_state.records.length){
            _state.records[index]=record;
        }
    },
    deleteRecord(index:number):void{
        if(index>=0 && _state.records.length){
            _state.records.splice(index,1);
        }
    },
    getRecord(index:number):ExpenseForm|null{
        if(index>=0 && index<_state.records.length){
            return _state.records[index];
        }
        return null;
    },

    getRecordsCount():number{
        return _state.records.length;
    },

    clearAllRecords():void{
        _state.records=[];
        _state.editIndex=null;
    }
};
