/**
* 引用计数对象
*/
module dou.data{
	export class RefAsset extends Laya.EventDispatcher{
		static GENRAL 		= 1;			// 一般素材（文本，， 贴图）
		static BUFFER		= 2;			// 二进制
		static TEMPLET 		= 3;			// 骨骼动画模板

		private static MAX_FREE_TIME = 30000;	// 素材超时释放时间

		private static _refMap:any = {};		// 列表

		static Get(key:string, create:boolean = true):RefAsset{
			let asset:RefAsset = this._refMap[key];
			if(create && !asset){
				asset = new RefAsset(key);
				this.Set(key, asset);
			}
			return asset;
		}



		static Set(key:string, asset:RefAsset):void{
			this._refMap[key] = asset;
		}

		private static _nextTimer:number = 0;

		static update(diff):void{
			let currTimer = Laya.timer.currTimer;
			if(currTimer < this._nextTimer){
				return;
			}
			this._nextTimer = currTimer + 1000; // 检查频率1秒
			let map = this._refMap;
			for(let key in map){
				let obj = map[key];
				// logd("RefAsset.update", "url", key, "refCount", obj._refCount, "timeOut", obj._timeOut);
				if(obj.update(currTimer)){
					delete map[key];
				}
			}
		}

		// 引用计数
		private _refCount:number = 0;
		// 超时时间
		private _timeOut:number = 0;
		// 是否准备好
		protected _parseComplete:boolean = false;
		get parseComplete():boolean{
			return this._parseComplete;
		}

		protected _url:string;
		get url():string{
			return this._url;
		}
		
		constructor(url:string){
			super();
			this._url = url;
			this.init();
		}

		protected init():void{
			// logd('RefAsset load', this._url);
			Laya.loader.load(this._url, Handler.create(this, this.onLoaded));
		}

		private onLoaded():void{
			this._parseComplete = true;
			this.event(LEvent.COMPLETE);
		}

		// 引用
		retain():void{
			this._refCount ++;
			this._timeOut = 0;
		}

		// 释放引用
		release():void{
			if(this._refCount <= 0){
				return;
			}
			this._refCount --;
			if(this._refCount == 0){
				this._timeOut = Laya.timer.currTimer + RefAsset.MAX_FREE_TIME;
			}	
		}

		
		
		private update(currTimer:number):boolean{
			let timeOut = this._timeOut && (currTimer > this._timeOut);
			if(timeOut){
				this.destroy();
			}
			return timeOut;
		}

		// 立即检查超时
		checkNow():void{
			if(this._refCount == 0){
				this._timeOut = Laya.timer.currTimer
			}
		}

		// 释放纹理
        protected destroy(): void{
			Laya.loader.clearRes(this._url, true);
			Laya.loader.cancelLoadByUrl(this._url);
		}
	}
}