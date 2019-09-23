/**
* name 
*/
module dou.scene{
	export class PlayerMeshSprite3D extends BaseMeshSprite3D{
		constructor(){
			super();
		}

		public init(sceneRoot:SceneRoot,value:any):void{
			super.init(sceneRoot,value);
			
		}
		
	
		private _playerScript:PlayerScript;
		public get playerScript()
		{	
			if (!this._playerScript) {
				this._playerScript = this.owner.addComponent(PlayerScript) as PlayerScript;
			}
			return this._playerScript;
		}

		public destroy():void
		{	
			if (this._playerScript) {
				if (!this.owner.destroyed) {
					this.owner.removeComponentByType(PlayerScript);
				}
				this._playerScript.destory();
				this._playerScript = null;
			}
			super.destroy();
		}

		
	}
}