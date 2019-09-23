/**
* name 
*/
module dou.scene {
	export class CameraMove extends Laya.Script {
		private caramaPos:Vector3;
		public gameObject: Laya.Sprite3D;

		private player: Laya.Sprite3D;
		private _sceneRoot: SceneRoot;
		private _offsetZ:number = 0.1;
		private _startPos:Vector3;
		private _distancePlayer:number = 0;
		private jiasu:Laya.ShuriKenParticle3D;

		public set distancePlayer(value:number)
		{
			this._distancePlayer = value;
		}

		constructor() {
			super();
		}


		private _firstAngle: number;
		public init(sceneRoot: SceneRoot): void {
			if (!this._sceneRoot)
				this._sceneRoot = sceneRoot;

			this.caramaPos = sceneRoot.camera.transform.position;
			this._startPos = sceneRoot.camera.transform.position.clone();
			this._offsetZ = 0.1;
			this.jiasu = sceneRoot.camera.getChildByName('jiasu') as Laya.ShuriKenParticle3D ;
			if(this.jiasu)
				this.jiasu.particleSystem.stop();
		}

		public reset():void
		{
			this.levelY = 0;
			this._offsetZ = 0.1;
			Laya.Quaternion.createFromYawPitchRoll(0, 0, Math.PI/2, this.qua);
			this._startPos.cloneTo(this.caramaPos);
			this._sceneRoot.camera.transform.position = this.caramaPos;
			// this.jiasu.transform.rotation = this.qua;
			// this._sceneRoot.camera.transform.rotation = this.qua;
			if(this.jiasu)
				this.jiasu.particleSystem.stop();
		}

		public _initialize(owner: Laya.Sprite3D): void {
			super._initialize(owner);
			//把对象存下来
			this.gameObject = owner as Laya.Sprite3D;
		} 

		private updateSpeed():void
		{
			this._offsetZ = this._sceneRoot.mainPlayer.playerScript.diff_z - this._distancePlayer;//(this._sceneRoot.mainPlayer.playerScript.speed_Z - this._speed) * 0.1;
		}

		private qua:Laya.Quaternion = new Laya.Quaternion();
		private oldFV:number = 0;
		private levelY:number = 0;
		public Update(diff: number): void {
			this.updateSpeed();
			this.caramaPos.z = this._offsetZ;
			let off:number = BuilderMgr.getOffestY(this._offsetZ);
			this.levelY += (off - this.levelY) * 0.1;
			this.caramaPos.y = this._startPos.y + this.levelY;
			this.caramaPos.x = -this._sceneRoot.mainPlayer.playerScript._moveDiffX * 0.3;
			PlayerBaseScript.baseSpeed < this._sceneRoot.mainPlayer.playerScript.speed_Z ? 90 > this._sceneRoot.camera.fieldOfView && (this._sceneRoot.camera.fieldOfView += 2) : 60 < this._sceneRoot.camera.fieldOfView && (this._sceneRoot.camera.fieldOfView -= .36);
			Laya.Quaternion.createFromYawPitchRoll(Math.PI , -5/180 * Math.PI, this._sceneRoot.mainPlayer.playerScript._moveDiffX * .2, this.qua);
			this._sceneRoot.camera.transform.position = this.caramaPos;
			
			// logd(this._sceneRoot.camera.fieldOfView)
			this._sceneRoot.camera.transform.rotation = this.qua;
		}

		public destory() {
			this.enable = false;
		}

	}
}