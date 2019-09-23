
/*
* name;
*/
class MessageManager{
    public static readonly dispatcher = new Laya.EventDispatcher;//只读
    public static on(type: string, caller: any, listener: Function, args?: Array<any>)
    {
        MessageManager.dispatcher.on(type,caller,listener,args);
    }

    public static event(type: string, data?: any)
    {
        MessageManager.dispatcher.event(type,data);
    }

    public static off(type: string, caller: any, listener: Function, onceOnly?: boolean): EventDispatcher
    {
        return MessageManager.dispatcher.off(type,caller,listener,onceOnly);
    }
}