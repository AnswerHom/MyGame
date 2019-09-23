/**
* name 
*/
module dou.scene{
	export class RobotMeshSprite3D extends BaseMeshSprite3D{
		constructor(){
			super();
		}

		public init(sceneRoot:SceneRoot,value:any):void{
			super.init(sceneRoot,value);
			
		}
		
	
		private _robotScript:RobotScript;
		public get robotScript()
		{	
			if (!this._robotScript) {
				this._robotScript = this.owner.addComponent(RobotScript) as RobotScript;
			}
			return this._robotScript;
		}

		public destroy():void
		{	
			if (this._robotScript) {
				if (!this.owner.destroyed) {
					this.owner.removeComponentByType(RobotScript);
				}
				this._robotScript.destory();
				this._robotScript = null;
			}
			super.destroy();
		}

		
	}
}