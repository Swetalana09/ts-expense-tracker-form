import StateService from "./state.service";

class StorageService{
    private static instance: StorageService;
    private readonly STORAGE_KEY='expenseTrackerState';

    private constructor(){}

    public static getInstance():StorageService{
        if(!StorageService.instance){
            StorageService.instance=new StorageService();
        }
        return StorageService.instance;
    }

    private getItem(key:string):string|null{
        try{
            return localStorage.getItem(key);
        }catch(error){
            console.error('Error reading from localStorage:',error);
            return null;
        }
    }

    private setItem(key:string, value:string):boolean{
        try{
            localStorage.setItem(key,value);
            return true;
        }catch(error){
            console.error('Error writing to localStorage:',error);
            return false;
        }
    }

    private removeItem(key:string):boolean{
        try{
            localStorage.removeItem(key);
            return true;
        }catch(error){
            console.error('Error removing from localStorage:',error);
            return false;
        }
    }

    public saveState():void{
        try{
            const stateService=StateService.getInstance();
            const stateToSave={
                records:stateService.records,
                editIndex:stateService.editIndex,
            };
            const jsonString=JSON.stringify(stateToSave);
            const success=this.setItem(this.STORAGE_KEY,jsonString);

            if(success){
                console.log("State saved to localStorage:",stateService.records.length,'records');
            }else{
                console.log('Failed to save state to localStorage');
            }
        }catch(error){
            console.error('Error saving to localStorage:',error);
        }
    }

    public loadState():void{
        try{
            const savedState=this.getItem(this.STORAGE_KEY);
            if(savedState){
                const parsed=JSON.parse(savedState);
                const stateService=StateService.getInstance();
                stateService.records=parsed.records||[];
                stateService.editIndex=parsed.editIndex||null;
                console.log('State loaded from localStorage:',stateService.records.length,'records');
            }else{
                console.log('No saved state found');
            }
        }catch(error){
            console.error('Error loading from localStorage:',error);
        }
    }

    public clearState():void{
        const success=this.removeItem(this.STORAGE_KEY);
        if(success){
            const stateService=StateService.getInstance();
            stateService.clearAllRecords();
            console.log('State cleared from localStorage');
        }else{
            console.error('Failed to clear state from localStorage');
        }
    }

    public hasState():boolean{
        const savedState=this.getItem(this.STORAGE_KEY);
        return savedState!==null;
    }

    public getStorageSize():number{
        const savedState=this.getItem(this.STORAGE_KEY);
        return savedState?savedState.length:0;
    }
}

export default StorageService;