/**
* 贴图素材
*/
module dou.data{
	export class AssetsLoader{
		private _list:Array<RefAsset> = [];
		private _handler:Handler;
		constructor(){
			
		}

		// 设置素材
		load(assets:Array<string>, handler:Handler):void{
			this.clear();
			let parseComplete = true;
			if(assets){
				for(let url of assets){
					let refTexture = RefAsset.Get(url);
					refTexture.retain();
					this._list.push(refTexture);
					if(!refTexture.parseComplete){
						parseComplete = false;
						refTexture.once(LEvent.COMPLETE, this, this.onAssetParseComplete);
					}
				}
			}
			if(parseComplete){
				handler.run();
			}
			else{
				this._handler = handler;
			}
		}

		// 有贴图解析完成
		private onAssetParseComplete():void{
			if(!this._handler){
				return;
			}
			let parseComplete = true;
			for(let refTexture of this._list){
				if(!refTexture.parseComplete){
					parseComplete = false;
					break;
				}
			}
			if(parseComplete){
				this._handler.run();
				this._handler = null;
			}
		}

		// 清理
		clear():void{
			for(let refTexture of this._list){
				refTexture.release();
			}
			this._list.length = 0;
		}
	}
}