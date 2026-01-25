import {state} from "./app.state";

const STORAGE_KEY='expenseTrackerState';

const _storage={
    getItem(key:string):string|null {
        try{
            return localStorage.getItem(key);
        }catch(error){
            console.error('Error reading from localStorage:',error);
            return null;
        }
    },

    setItem(key:string, value:string):boolean{
        try{
            localStorage.setItem(key,value);
            return true;
        }catch(error){
            console.error('Error writing to localStorage:',error);
            return false;
        }
    },

    removeItem(key:string):boolean{
        try{
            localStorage.removeItem(key);
            return true;
        }catch(error){
            console.error('Error removing from localStorage:',error);
            return false;
        }
    }
};

const storage={
    saveState():void{
        try{
            const stateToSave={
                records:state.records,
                editIndex:state.editIndex,
            };
            const jsonString=JSON.stringify(stateToSave);
            const success=_storage.setItem(STORAGE_KEY,jsonString);

            if(success){
                console.log("State saved to localStorage:",state.records.length,'records');
            }else{
                console.error('Failed to save state to localStorage');
            }
        }catch(error){
            console.error('Error saving to localStorage:',error);
        }
    },

    loadState():void{
        try{
            const savedState=_storage.getItem(STORAGE_KEY);
            
            if(savedState){
                const parsed=JSON.parse(savedState);
                state.records=parsed.records||[];
                state.editIndex=parsed.editIndex||null;
                console.log('State loaded from localStorage:',state.records.length,'records');
        }else{
            console.log('No saved state found');
        }
    }catch(error){
        console.log('Error loading from localStorage:',error);
    }
},

clearState():void{
    const success=_storage.removeItem(STORAGE_KEY);
    if(success){
        state.clearAllRecords();
        console.log('State cleared from localStorage');
    }else{
        console.log('Failed to clear state from localStorage');
    }
},

hasState():boolean{
    const savedState=_storage.getItem(STORAGE_KEY);
    return savedState !== null;
},

getStorageSize():number{
    const savedState=_storage.getItem(STORAGE_KEY);
    return savedState ? savedState.length:0;
},

exportState():string|null{
    try{
        return _storage.getItem(STORAGE_KEY);
    }catch(error){
        console.error('Error exporting state:',error);
        return null;
    }
},

importState(jsonString:string):boolean{
    try{
        JSON.parse(jsonString);
        const success=_storage.setItem(STORAGE_KEY,jsonString);

        if(success){
            this.loadState();
            console.log('State imported successfully');
            return true;
        }
        return false;
    }catch(error){
        console.error('Error importing state:',error);
        return false;
    }
}
};

export default storage;

