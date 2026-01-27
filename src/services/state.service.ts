import type { ExpenseForm } from "../types";
import EventBus from "./eventbus.service";

class StateService{
    private static instance: StateService;
    private _records:ExpenseForm[]=[];
    private _editIndex:number|null=null;
    private eventBus:EventBus;

    private constructor(){
        this.eventBus=EventBus.getInstance();
    }

    public static getInstance(): StateService{
        if(!StateService.instance){
            StateService.instance=new StateService();
        }
        return StateService.instance;
    }

    public get records():ExpenseForm[]{
        return this._records;
    }

    public set records(value:ExpenseForm[]){
        this._records=value;
        this.eventBus.publish('RECORDS_CHANGED');
    }    

    public get editIndex():number|null{
        return this._editIndex;
    }

    public set editIndex(value:number|null){
        this._editIndex=value;
        this.eventBus.publish('EDIT_MODE_CHANGED',{editIndex:value});
    }

    public addRecord(record:ExpenseForm):void{
        this._records.push(record);
        this.eventBus.publish('RECORD_ADDED',record);
    }

    public updateRecord(index:number, record:ExpenseForm):void{
        if(index>=0 && index<this._records.length){
            this._records[index]=record;
            this.eventBus.publish('RECORD_UPDATED',{index,record});
        }
    }

    public deleteRecord(index:number):void{
        if(index>=0 && index<this._records.length){
            this._records.splice(index,1);
            this.eventBus.publish('RECORD_DELETED',{index});
        }
    }

    public getRecord(index:number):ExpenseForm|null{
        if(index>=0 && index<this._records.length){
            return this._records[index];
        }
        return null;
    }

    public getRecordsCount():number{
        return this._records.length;
    }

    public clearAllRecords():void{
        this._records=[];
        this._editIndex=null;
        this.eventBus.publish('RECORDS_CLEARED');
    }
}

export const state=StateService.getInstance();
export default StateService;