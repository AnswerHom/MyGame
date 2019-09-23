/**
* HUD
*/
module dou.gui{
	export class HUD extends dou.gui.base.PageContainer {
		constructor(app: GameApp){
			super(app);
		}		

		closeAll():void{
			for (let key in this._pages) {
				let pageid:number = Number(key);
				this.close(pageid);
			}
		}
	}
}