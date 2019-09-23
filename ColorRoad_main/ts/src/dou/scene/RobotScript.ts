/**
* name 
*/
module dou.scene{
	export class RobotScript extends PlayerBaseScript{

		constructor(){
			super();
		}

		public init(app:GameApp, isMainPlayer:boolean):void{
			super.init(app, isMainPlayer);
		}
		
		private onStartGame()
		{

		}

		private onEndGame()
		{
		}
		
		public _initialize(owner: Laya.MeshSprite3D): void {
			super._initialize(owner,false);
			this.player = owner;
    	}


		



		public destory()
		{
			super.destory();
		}
	}
}