type EventCallback=(data?:unknown)=>void;

class EventBus{
    private static instance: EventBus;

    private listeners: Map<string,EventCallback[]>;

    private constructor(){
        this.listeners=new Map();
    }
    public static getInstance():EventBus{
        if(!EventBus.instance){
            EventBus.instance=new EventBus();
        }
        return EventBus.instance;
    }

    public subscribe (eventName:string, callback:EventCallback):void{
        const callbacks=this.listeners.get(eventName)||[];
        callbacks.push(callback);
        this.listeners.set(eventName,callbacks);
        console.log(`Subscribed to ${eventName}`);
    }

    public publish(eventName:string, data?: unknown):void{
        const callbacks=this.listeners.get(eventName);
        if(!callbacks || callbacks.length===0){
            return;
        }
        console.log(`Publishing ${eventName}`,data);
        callbacks.forEach(callback=>{
            try{
                callback(data);
            }catch(error){
                console.log(`Error in event callback for ${eventName}:`, error);
            }
        });
    }

    public unsubscribe (eventName:string, callback: EventCallback):void{
        const callbacks=this.listeners.get(eventName);
        if(!callbacks) return;

        const filtered=callbacks.filter(cb=>cb!==callback);
        this.listeners.set(eventName,filtered);
    }
}
export default EventBus;