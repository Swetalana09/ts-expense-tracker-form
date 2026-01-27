import StorageService from "./storage.service";
import type { ExpenseForm } from "../types";
import StateService from "./state.service";

class LogicService{
    private static instance: LogicService;
    private storageService:StorageService;
    private stateService:StateService;

    private constructor(){
        this.storageService=StorageService.getInstance();
        this.stateService=StateService.getInstance();
    }

    public static getInstance(): LogicService{
        if(!LogicService.instance){
            LogicService.instance=new LogicService();
        }
        return LogicService.instance;
    }

    public addRecord(data:ExpenseForm):void{
        this.stateService.addRecord(data);
        this.storageService.saveState();
        console.log('Record added, state saved');
    }

    public updateRecord(data:ExpenseForm):void{
        const editIndex=this.stateService.editIndex;
        if(editIndex!==null){
            this.stateService.updateRecord(editIndex,data);
            this.stateService.editIndex=null;
            this.storageService.saveState();
            console.log('Record updated, state saved');
        }
    }

    public deleteRecord(index:number):void{
        const editIndex=this.stateService.editIndex;
        this.stateService.deleteRecord(index);

        if(editIndex===index){
            this.stateService.editIndex=null;
        }else if(editIndex!==null && editIndex>index){
            this.stateService.editIndex=editIndex-1;
        }
        this.storageService.saveState();
        console.log('Record deleted');
    }

    public editRecord(index:number):void{
        this.stateService.editIndex=index;
        console.log('Edit mode:index',index);
    }

    public getRecord(index:number):ExpenseForm|null{
        return this.stateService.getRecord(index);
    }

    public getAllRecords():ExpenseForm[]{
        return this.stateService.records;
    }

    public getRecordsCount():number{
        return this.stateService.getRecordsCount();
    }

    public isEditing():boolean{
        return this.stateService.editIndex!==null;
    }

    public getEditIndex():number|null{
        return this.stateService.editIndex;
    }

    public cancelEdit():void{
        this.stateService.editIndex=null;
    }

    public clearAllRecords():void{
        this.stateService.clearAllRecords();
        this.storageService.saveState();
        console.log('All records cleared');
    }
}

export default LogicService;