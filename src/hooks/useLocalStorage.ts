import { useState,useEffect } from "react";

const STORAGE_KEY='expenseTrackerState';

export function useLocalStorage<T>(key:string,initialValue:T){
    const [storedValue,setStoredValue]=useState<T>(()=>{
        try{
            const item=window.localStorage.getItem(key);
            if(item){
                const parsed=JSON.parse(item);
                console.log('State loaded from localStorage',parsed.records?.length||0,'records');
                    return parsed;
            }
            return initialValue;
        }catch(error){
            console.error('Error reading from localStorage:',error);
            return initialValue;
        }
    });

    useEffect(()=>{
        try{
            window.localStorage.setItem(key,JSON.stringify(storedValue));
            console.log('State saved to localStorage');
        }catch(error){
            console.error('Error writing to localStorage:',error);
        }
    },[key,storedValue]);
    return [storedValue,setStoredValue] as const;
}
export {STORAGE_KEY};