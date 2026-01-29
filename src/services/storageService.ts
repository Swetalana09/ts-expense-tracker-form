const STORAGE_KEY='expenseTrackerState';

class StorageService{
    private key:string;
    
    constructor(key:string=STORAGE_KEY){
        this.key=key;
    }

    getItem<T>(defaultValue :T): T{
        try{
            const item=window.localStorage.getItem(this.key);
            if(item){
                const parsed=JSON.parse(item);
                console.log('State loaded from localStorage:',parsed.records?.length||0,'records');
                return parsed;
            }
            return defaultValue;
        }catch (error){
        console.error('Error reading from localStorage:',error);
        return defaultValue;
        }
    }

    setItem<T>(value:T):void{
        try{
            window.localStorage.setItem(this.key,JSON.stringify(value));
            console.log('State saved to localStorage');
        }catch(error){
            console.error('Error writing to localStorage:',error);
        }
    }

    removeItem():void{
        try{
            window.localStorage.removeItem(this.key);
            console.log('State removed from localStorage');
        }catch(error){
            console.error('Error removing from localStorage:',error);
        }
    }

    clear():void{
        try{
            window.localStorage.clear();
            console.log('All localStorage cleared');
        }catch(error){
            console.error('Error clearing localStorage:',error);
        }
    }
}

export const storageService=new StorageService();
export {STORAGE_KEY};