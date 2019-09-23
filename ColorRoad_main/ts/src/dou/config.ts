class BaseConfig<T>{
    private _dataClass:any;
    constructor(dataClass:any) {
        this._dataClass = dataClass;
    }
    set dataSource(v:any){
        let arrayFun:Function = (str:string):number[]=>{
            let arr:string[] = str.split("|");
            let list:number[] = [];
            for(let i:number = 0; i < arr.length; i++) list.push(Number(arr[i]));
            return list;
        };
        let list:string[] = v.split("\r\n");
        this._keys = [];
        this._datas = [];
        let data:any;
        for(let i:number = 5; i < list.length; i++){
            if(!list[i]) continue;
            data = new this._dataClass();
            data.init(list[i], arrayFun);
            this._keys.push(data.id);
            this._datas.push(data);
        }
    }
    private _keys:number[];
    private _datas:T[];
    get keys():number[]{
        return this._keys;
    }
    get datas():T[]{
        return this._datas;
    }
    getTypeData(id:number):T{
        if(!this._datas) return null;
        let index:number = this._keys.indexOf(id);
        if(index == -1) return null;
        return this._datas[index];
    }
    get dataLength():number{
        if(!this._keys) return 0;
        return this._keys.length;
    }
}

class SkinConfig extends BaseConfig<SkinData>{
    constructor() {
        super(SkinData);
    }
    private static _instance:SkinConfig
    static getInstance(): SkinConfig {
        if(!this._instance) this._instance = new SkinConfig();
        return this._instance;
    }
    static init(dataSrc: any): void {
        SkinConfig.getInstance().dataSource = dataSrc;
    }

    //获取皮肤
    public getSkinListByType(type:number):SkinData[]{
        let allSkin:SkinData[] = [];
        for (let i:number = 0; i < this.datas.length; i++){
            if (this.datas[i].type == type){
                allSkin.push(this.datas[i]);
            }
        }
        allSkin.sort(SkinConfig.sortSkin);
        return allSkin;
    }

    static sortSkin(skin1:SkinData, skin2:SkinData):number{
        return skin1.index - skin2.index;
    }
}
class SkinData {

    public static CONDITION_TYPE_ONE:number = 1;        //金币购买
    public static CONDITION_TYPE_TWO:number = 2;        //未知
    public static CONDITION_TYPE_THREE:number = 3;        //邀请好友

    id: number;
    type:number;
    index:number;
    name: string;
    avatar:string;
    c_type:number;
    condition:number;
    quality:number;
    public constructor() {
    }
    public init(data:string,arrayFun:Function):void{
        let arr:string[] = data.split(",");
        this.id = Number(arr.shift());
        this.type = Number(arr.shift());
        this.index = Number(arr.shift());
        this.name = arr.shift();
        this.quality = Number(arr.shift());
        this.c_type = Number(arr.shift());
        this.condition = Number(arrayFun(arr.shift()));
        this.avatar = arr.shift();
    }
}