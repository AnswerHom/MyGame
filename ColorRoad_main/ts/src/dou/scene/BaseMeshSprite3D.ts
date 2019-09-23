/**
* name 
*/
module dou.scene{
	export class BaseMeshSprite3D{

		protected _sceneRoot:SceneRoot;
		public owner:Laya.MeshSprite3D;
		/**
		 * 刚体
		 */
		protected rigidbody:Laya.Rigidbody;

		/**
		 * 碰撞盒
		 */
		protected boxCollider:Laya.SphereCollider;

		protected animator:Laya.Animator;

		constructor(){
			
		}
		
		public init(scene:SceneRoot, value:any):void{
			this._sceneRoot = scene;
			this.owner = value;
			this.owner["owner"] = this;
			if (!this.animator) {
				this.animator = this.owner.getComponentByType(Laya.Animator) as Laya.Animator;
			}

		}
		

		public playAnimation(name?: string)
		{
			if (this.animator) {
				let arr:Laya.AnimationClip[] = this.animator["_clips"];
				if(arr) this.animator.play(name);
				// if(!this._aniClip && arr && arr.length){
				// 	this._aniClip = arr[0];
				// }
				// else if(this._aniClip){
				// 	this.animator.addClip(this._aniClip);
				// }
			}
		}

		public stopAnimation()
		{
			if (this.animator) {
				let arr:Laya.AnimationClip[] = this.animator["_clips"];
				if(arr && arr.length){
					this.animator.stop();
				}
			}
		}

		public destroy():void
		{	
			if (this.owner && !this.owner.destroyed) {
				this.removeBoxCollider();
				this.removeRigidbody();
				this.stopAnimation();
				if (this.owner.parent) {
					this.owner.parent.destroy();
					this.owner.parent = null;
				}
				this.owner.destroy();
				this.owner = null;
			}
		}

		public createBoxCollider():Laya.SphereCollider
		{	
			if (!this.boxCollider) {
				if (!this.boxCollider) {
					this.boxCollider = this.owner.addComponent(Laya.SphereCollider) as Laya.SphereCollider;
					this.boxCollider.radius = BuilderMgr.ball_radis;
				}
				this.boxCollider.enable = false;
			}
			return this.boxCollider;
		}

		public removeBoxCollider():void
		{
			if (this.boxCollider) {
				this.boxCollider.enable = false;
				this.owner.removeComponentByType(Laya.BoxCollider);
			}
		}

		public set boxColliderEnable(enable:boolean)
		{	
			if(enable){
				if (this.createBoxCollider().owner) {
					this.createBoxCollider().enable = enable;
				}
			}
			else if(this.boxCollider){
				this.boxCollider.enable = false;
			}
			
		}

		public createRigidbody():Laya.Rigidbody
		{	
			if (!this.rigidbody) {
				this.rigidbody = this.owner.getComponentByType(Laya.Rigidbody) as Laya.Rigidbody;
				if (!this.rigidbody) {
					this.rigidbody = this.owner.addComponent(Laya.Rigidbody) as Laya.Rigidbody;
				}
				this.rigidbody.enable = false;
			}
			return this.rigidbody;
		}

		public removeRigidbody():void
		{
			if (this.rigidbody) {
				this.rigidbody.enable = false;
				this.owner.removeComponentByType(Laya.Rigidbody);
			}
		}

		public set rigidbodyEnable(enable:boolean)
		{	
			if(enable){

			}
			if (this.createRigidbody().owner) {
				this.createRigidbody().enable = enable;
			}
		}
		
		public get transform():Laya.Transform3D
		{
			return this.owner.transform;
		}
		
		public set active(value:boolean)
		{	
			if (this.owner) {
				
				this.owner.active = value;
			}
		}
	}
}