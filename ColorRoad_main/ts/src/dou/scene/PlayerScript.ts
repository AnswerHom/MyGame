/**
* name 
*/
module dou.scene{
	export class PlayerScript extends PlayerBaseScript{
		constructor(){
			super();
		}

		public init(app:GameApp, isMainPlayer:boolean):void{
			console.log("主玩家初始化")
			super.init(app, isMainPlayer);
		}
		
		private onStartGame()
		{
		}

		private onEndGame()
		{
		}
		
		public _initialize(owner: Laya.MeshSprite3D): void {
			super._initialize(owner,true);
			this.player = owner;
    	}

		public playDie():void
		{
			super.playDie()
			
		}


		public destory()
		{
			super.destory();
		}
	}
}